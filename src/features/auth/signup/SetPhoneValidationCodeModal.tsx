import { t } from '@lingui/macro'
import { useNavigation } from '@react-navigation/native'
import parsePhoneNumber from 'libphonenumber-js'
import _ from 'lodash'
import React, { FC, useEffect, useState } from 'react'
import { Dimensions } from 'react-native'
import TextInputMask from 'react-native-text-input-mask'
import styled from 'styled-components/native'

import { ApiError, extractApiErrorMessage } from 'api/helpers'
import { useSendPhoneValidationMutation, useValidatePhoneNumberMutation } from 'features/auth/api'
import { QuitSignupModal, SignupSteps } from 'features/auth/components/QuitSignupModal'
import { useBeneficiaryValidationNavigation } from 'features/auth/signup/useBeneficiaryValidationNavigation'
import { UseNavigationType } from 'features/navigation/RootNavigator/types'
import { currentTimestamp } from 'libs/dates'
import { storage } from 'libs/storage'
import { TIMER_NOT_INITIALIZED, useTimer } from 'libs/timer'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { ButtonQuaternary } from 'ui/components/buttons/ButtonQuaternary'
import { ButtonTertiary } from 'ui/components/buttons/ButtonTertiary'
import { InputError } from 'ui/components/inputs/InputError'
import { AppModal } from 'ui/components/modals/AppModal'
import { useModal } from 'ui/components/modals/useModal'
import { Separator } from 'ui/components/Separator'
import { ArrowPrevious } from 'ui/svg/icons/ArrowPrevious'
import { Close } from 'ui/svg/icons/Close'
import { Email } from 'ui/svg/icons/Email'
import { ColorsEnum, getSpacing, Spacer, Typo } from 'ui/theme'

import { contactSupport } from '../support.services'

const CODE_INPUT_LENGTH = 6

const screenWidth = Dimensions.get('window').width

export interface SetPhoneValidationCodeModalProps {
  visible: boolean
  dismissModal: () => void
  phoneNumber: string
  onGoBack: () => void
}

interface CodeInputState {
  code: string
  isValid: boolean
}

const TIMER = 60

export const SetPhoneValidationCodeModal: FC<SetPhoneValidationCodeModalProps> = (props) => {
  const { navigate } = useNavigation<UseNavigationType>()
  const [codeInputState, setCodeInputState] = useState<CodeInputState>({
    code: '',
    isValid: false,
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [validationCodeRequestTimestamp, setValidationCodeRequestTimestamp] = useState<
    null | number
  >(null)

  const timeSinceLastRequest = useTimer(
    validationCodeRequestTimestamp,
    (elapsedTime: number) => elapsedTime > TIMER
  )

  const isRequestTimestampExpired =
    !validationCodeRequestTimestamp ||
    timeSinceLastRequest === TIMER_NOT_INITIALIZED ||
    timeSinceLastRequest >= TIMER

  const {
    visible: fullPageModalVisible,
    showModal: showFullPageModal,
    hideModal: hideFullPageModal,
  } = useModal(props.visible)

  const { error, navigateToNextBeneficiaryValidationStep } = useBeneficiaryValidationNavigation()

  const { mutate: validatePhoneNumber } = useValidatePhoneNumberMutation({
    onSuccess: onValidateSuccess,
    onError,
  })

  const { mutate: sendPhoneValidationCode } = useSendPhoneValidationMutation({
    onSuccess: onSendCodeSuccess,
    onError,
  })

  useEffect(() => {
    storage.readObject('phone_validation_code_asked_at').then((value) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValidationCodeRequestTimestamp(value as any)
    })
  }, [props.visible])

  function onValidateSuccess() {
    navigateToNextBeneficiaryValidationStep()
    props.dismissModal()
  }

  function onError(error: unknown | ApiError) {
    const { content } = error as ApiError
    if (content.code === 'TOO_MANY_VALIDATION_ATTEMPTS' || content.code === 'TOO_MANY_SMS_SENT') {
      props.dismissModal()
      navigate('PhoneValidationTooManyAttempts')
    } else {
      setErrorMessage(extractApiErrorMessage(error))
    }
  }

  function onSendCodeSuccess() {
    const now = currentTimestamp()
    storage.saveObject('phone_validation_code_asked_at', now)
    setValidationCodeRequestTimestamp(now)
  }

  function onChangeValue(_formatted: string, extracted?: string) {
    const code = extracted ?? ''
    setCodeInputState({
      code: code,
      isValid: isCodeValid(code),
    })
  }

  function validateCode() {
    setErrorMessage('')
    const { code } = codeInputState
    if (code) {
      validatePhoneNumber(code)
    }
  }

  function goBack() {
    setErrorMessage('')
    props.onGoBack()
  }

  function getRetryButtonTitle() {
    if (isRequestTimestampExpired) return t`Réessayer`
    const remainingTime = TIMER - timeSinceLastRequest
    return t`Attends` + ` ${remainingTime}s.`
  }

  function requestSendPhoneValidationCode() {
    if (isRequestTimestampExpired) {
      sendPhoneValidationCode(props.phoneNumber)
    }
  }

  const validationCodeInformation =
    t`Saisis le code envoyé par SMS au numéro` +
    ` ${formatPhoneNumber(props.phoneNumber)}.` +
    '\n' +
    t`Attention tu n'as que 3 tentatives.`

  function getDashColor(index: number) {
    if (codeInputState.code?.length > index) {
      return ColorsEnum.GREEN_VALID
    }
    if (errorMessage) {
      return ColorsEnum.ERROR
    }
    return ColorsEnum.GREY_MEDIUM
  }

  if (error) {
    throw error
  }

  return (
    <AppModal
      visible={props.visible}
      title={t`Confirme ton numéro`}
      rightIcon={Close}
      onRightIconPress={showFullPageModal}
      leftIcon={ArrowPrevious}
      onLeftIconPress={goBack}
      disableBackdropTap
      isScrollable
      shouldDisplayOverlay={false}>
      <ModalContent>
        <Paragraphe>
          <Typo.Body>{validationCodeInformation}</Typo.Body>
        </Paragraphe>
        <Spacer.Column numberOfSpaces={6} />
        <CodeInputContainer>
          <CodeInput
            onChangeText={onChangeValue}
            placeholder={codeInputPlaceholder}
            placeholderTextColor={ColorsEnum.GREY_DARK}
            mask={codeInputMask}
          />
          <Spacer.Column numberOfSpaces={1} />
          <CodeInputBorder>
            {_.times(6, (number) => (
              <CodeInputDash color={getDashColor(number)} />
            ))}
          </CodeInputBorder>
        </CodeInputContainer>
        {errorMessage ? (
          <React.Fragment>
            <InputError visible messageId={errorMessage} numberOfSpacesTop={3} />
            <Spacer.Column numberOfSpaces={5} />
          </React.Fragment>
        ) : (
          <Spacer.Column numberOfSpaces={8} />
        )}
        <ButtonPrimary
          title={t`Continuer`}
          disabled={!codeInputState.isValid}
          onPress={validateCode}
        />
        <Spacer.Column numberOfSpaces={4} />
        <HelpRow>
          <Typo.Body>{t`Tu n'as pas reçu le sms ?`}</Typo.Body>
          {/* force button to wrap on small screen, otherwise timer will "unwrap" when timer is under 10 seconds */}
          {screenWidth <= 320 ? <Break /> : null}
          <ButtonTertiary
            title={getRetryButtonTitle()}
            testId={'Réessayer'}
            onPress={requestSendPhoneValidationCode}
            inline
            disabled={!isRequestTimestampExpired}
          />
        </HelpRow>
        <Spacer.Column numberOfSpaces={4} />
        <Separator color={ColorsEnum.GREY_MEDIUM} />
        <Spacer.Column numberOfSpaces={4} />
        <HelpRow>
          <Typo.Caption color={ColorsEnum.GREY_DARK}>
            {t`Si tu n’arrives pas à récuperer ton code tu peux`}
            <Spacer.Row numberOfSpaces={1} />
            <ButtonQuaternary
              title={t`Contacter le support`}
              icon={Email}
              onPress={contactSupport.forPhoneNumberConfirmation}
              inline
            />
          </Typo.Caption>
        </HelpRow>
      </ModalContent>
      <QuitSignupModal
        visible={fullPageModalVisible}
        resume={hideFullPageModal}
        signupStep={SignupSteps.PhoneNumber}
      />
    </AppModal>
  )
}

/** returns a formatted phone number like +33 X XX XX XX XX with unbreakable spaces
 */
export const formatPhoneNumber = (phoneNumber: string) => {
  const parsedPhoneNumber = parsePhoneNumber(phoneNumber)
  return parsedPhoneNumber?.formatInternational().replace(/ /g, '\u00a0')
}

const isCodeValid = (code: string | null) => {
  return code !== null && !isNaN(Number(code)) && code.length === CODE_INPUT_LENGTH
}

const codeInputPlaceholder = ('0' + '\u00a0'.repeat(6)).repeat(5) + '0'
const codeInputMask = ('[0]' + '\u00a0'.repeat(6)).repeat(5) + '[0]'

const CodeInputBorder = styled.View({
  flexDirection: 'row',
})

const CodeInputDash = styled.View<{ color: ColorsEnum }>(({ color }) => ({
  background: color,
  height: 5,
  width: 32,
  borderRadius: 22,
  marginHorizontal: getSpacing(1),
}))

const CodeInput = styled(TextInputMask)({
  fontSize: 20,
  marginLeft: getSpacing(3),
})

const CodeInputContainer = styled.View({
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: 240,
})

const Break = styled.View({
  flexBasis: '100%',
})

const ModalContent = styled.View({
  width: '100%',
  alignItems: 'center',
})

const Paragraphe = styled.Text({
  flexWrap: 'wrap',
  flexShrink: 1,
  textAlign: 'center',
})

const HelpRow = styled.View({
  flexDirection: 'row',
  width: '100%',
  flexWrap: 'wrap',
  alignItems: 'center',
})
