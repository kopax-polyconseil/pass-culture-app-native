/* eslint-disable react-native/no-raw-text */
import { useNavigation } from '@react-navigation/native'
import React, { FunctionComponent, useCallback, useState } from 'react'
import { ScrollView, View, Text, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

import { AlgoliaCategory } from 'libs/algolia'
import { mapCategoryToIcon } from 'libs/parsers'
import { ButtonPrimary } from 'ui/components/buttons/ButtonPrimary'
import { ButtonPrimaryWhite } from 'ui/components/buttons/ButtonPrimaryWhite'
import { ButtonQuaternary } from 'ui/components/buttons/ButtonQuaternary'
import { ButtonSecondary } from 'ui/components/buttons/ButtonSecondary'
import { ButtonTertiary } from 'ui/components/buttons/ButtonTertiary'
import { ButtonTertiaryWhite } from 'ui/components/buttons/ButtonTertiaryWhite'
import { ExternalLink } from 'ui/components/buttons/ExternalLink'
import { DateInput } from 'ui/components/inputs/DateInput'
import { PartialDateInput, DatePartType } from 'ui/components/inputs/PartialDateInput'
import { PasswordInput } from 'ui/components/inputs/PasswordInput'
import { InputRule } from 'ui/components/inputs/rules/InputRule'
import { TextInput } from 'ui/components/inputs/TextInput'
import { AppModal } from 'ui/components/modals/AppModal'
import { ModalHeader } from 'ui/components/modals/ModalHeader'
import { useModal } from 'ui/components/modals/useModal'
import { useSnackBarContext } from 'ui/components/snackBar/SnackBarContext'
import { ArrowNext } from 'ui/svg/icons/ArrowNext'
import { ArrowPrevious } from 'ui/svg/icons/ArrowPrevious'
import { BicolorBookings } from 'ui/svg/icons/BicolorBookings'
import { BicolorFavorite } from 'ui/svg/icons/BicolorFavorite'
import { BicolorLogo } from 'ui/svg/icons/BicolorLogo'
import { BicolorProfile } from 'ui/svg/icons/BicolorProfile'
import { BicolorSearch } from 'ui/svg/icons/BicolorSearch'
import { BicolorSelector } from 'ui/svg/icons/BicolorSelector'
import { Check } from 'ui/svg/icons/Check'
import { Close } from 'ui/svg/icons/Close'
import { Digital } from 'ui/svg/icons/Digital'
import { Email } from 'ui/svg/icons/Email'
import { ExternalSite } from 'ui/svg/icons/ExternalSite'
import { Eye } from 'ui/svg/icons/Eye'
import { EyeSlash } from 'ui/svg/icons/EyeSlash'
import { LocationPointer } from 'ui/svg/icons/LocationPointer'
import { Logo } from 'ui/svg/icons/Logo'
import { SadFace } from 'ui/svg/icons/SadFace'
import { UserCircle } from 'ui/svg/icons/UserCircle'
import { Warning } from 'ui/svg/icons/Warning'
import { Rectangle } from 'ui/svg/Rectangle'
import { ColorsEnum, getSpacing, Spacer, Typo } from 'ui/theme'

function onButtonPress() {
  Alert.alert('you pressed it')
}

interface SectionsVisibility {
  typos: boolean
  buttons: boolean
  modals: boolean
  icons: boolean
  inputs: boolean
  snackbars: boolean
  components: boolean
}

type AllowedSection = keyof SectionsVisibility

export const AppComponents: FunctionComponent = () => {
  const {
    visible: basicModalVisible,
    showModal: showBasicModal,
    hideModal: hideBasicModal,
  } = useModal(false)

  const [sectionsVisibility, setSectionsVisibility] = useState<SectionsVisibility>({
    typos: false,
    buttons: false,
    modals: false,
    icons: false,
    inputs: false,
    snackbars: false,
    components: false,
  })

  const toggleSectionVisibility = useCallback(
    (section: AllowedSection) =>
      setSectionsVisibility((config) => ({ ...config, [section]: !config[section] })),
    []
  )

  function toggleTypos() {
    toggleSectionVisibility('typos')
  }
  function toggleButtons() {
    toggleSectionVisibility('buttons')
  }
  function toggleModals() {
    toggleSectionVisibility('modals')
  }
  function toggleIcons() {
    toggleSectionVisibility('icons')
  }
  function toggleInputs() {
    toggleSectionVisibility('inputs')
  }
  function toggleSnackbars() {
    toggleSectionVisibility('snackbars')
  }
  function toggleComponents() {
    toggleSectionVisibility('components')
  }

  const [buttonIsLoading, setButtonIsLoading] = useState(false)
  const [_partialDate, setPartialDate] = useState('')
  const [inputText, setInputText] = useState('')

  const onTriggerFakeLoading = useCallback(() => {
    setButtonIsLoading(true)
    setTimeout(() => setButtonIsLoading(false), 3000)
  }, [])

  const { displaySuccessSnackBar, displayInfosSnackBar, hideSnackBar } = useSnackBarContext()
  const popupSnackBarSuccess = useCallback(
    () =>
      displaySuccessSnackBar({
        message: 'Ton mot de passe est modifié, attends 5 secondes !!!',
        timeout: 5000,
      }),
    []
  )
  const popupSnackBarInfos = useCallback(
    () =>
      displayInfosSnackBar({
        message: 'This is a warning !!!',
        onClose: hideSnackBar,
      }),
    []
  )

  const { goBack } = useNavigation()

  return (
    <StyledScrollView>
      <Spacer.TopScreen />
      <ModalHeader title="App components" leftIcon={ArrowPrevious} onLeftIconPress={goBack} />
      {/* Typos */}
      <Typo.Title1 color={ColorsEnum.PRIMARY} onPress={toggleTypos}>
        Typos
      </Typo.Title1>

      <Section visible={sectionsVisibility.typos}>
        <Typo.Hero>Hero</Typo.Hero>
        <Typo.Title1>Title 1</Typo.Title1>
        <Typo.Title2>Title 2</Typo.Title2>
        <Typo.Title3>Title 3</Typo.Title3>
        <Typo.Title4>Title 4</Typo.Title4>
        <Typo.Body>This is a body</Typo.Body>
        <Typo.ButtonText>This is a button text</Typo.ButtonText>
        <Typo.Caption>This is a caption</Typo.Caption>
      </Section>
      <Spacer.Column numberOfSpaces={5} />

      {/* Buttons */}
      <Typo.Title1 color={ColorsEnum.PRIMARY} onPress={toggleButtons}>
        Buttons
      </Typo.Title1>
      <Section visible={sectionsVisibility.buttons}>
        {/* Buttons: Primary */}
        <Typo.Title4>Button - Theme Primary</Typo.Title4>
        <Spacer.Column numberOfSpaces={1} />
        <ButtonPrimary
          title="Longpress to see"
          onPress={onButtonPress}
          onLongPress={onTriggerFakeLoading}
          icon={Close}
          isLoading={buttonIsLoading}
        />
        <Spacer.Column numberOfSpaces={1} />
        <ButtonPrimary title="Disabled" onPress={onButtonPress} icon={Close} disabled />
        <Spacer.Column numberOfSpaces={2} />
        {/* Buttons: White Primary */}
        <Typo.Title4>Button - White Primary Secondary</Typo.Title4>
        <Spacer.Column numberOfSpaces={1} />
        <ButtonPrimaryWhite
          title="White button"
          onPress={onTriggerFakeLoading}
          isLoading={buttonIsLoading}
          icon={Close}
        />
        <Spacer.Column numberOfSpaces={1} />
        <ButtonPrimaryWhite title="Disabled" onPress={onButtonPress} icon={Close} disabled />
        <Spacer.Column numberOfSpaces={2} />
        {/* Buttons: Secondary */}
        <Typo.Title4>Button - Theme Secondary</Typo.Title4>
        <Spacer.Column numberOfSpaces={1} />
        <ButtonSecondary
          title="Triggers all active buttons"
          icon={Close}
          isLoading={buttonIsLoading}
          onPress={onTriggerFakeLoading}
        />
        <Spacer.Column numberOfSpaces={1} />
        <ButtonSecondary title="Disabled" icon={Close} disabled onPress={onButtonPress} />
        <Spacer.Column numberOfSpaces={2} />
        {/* Buttons: Tertiary */}
        <Typo.Title4>Button - Theme Tertiary</Typo.Title4>
        <Spacer.Column numberOfSpaces={1} />
        <ButtonTertiary
          title="Triggers all active buttons"
          icon={Close}
          isLoading={buttonIsLoading}
          onPress={onTriggerFakeLoading}
        />
        <Spacer.Column numberOfSpaces={1} />
        <ButtonTertiary title="Disabled" onPress={onButtonPress} icon={Close} disabled />
        <Spacer.Column numberOfSpaces={1} />
        <ButtonTertiaryWhite
          title="White tertiary button"
          icon={Close}
          isLoading={buttonIsLoading}
          onPress={onTriggerFakeLoading}
        />
        <Spacer.Column numberOfSpaces={2} />
        {/* Buttons: Quaternary */}
        <Typo.Title4>Button - Theme Quaternary</Typo.Title4>
        <Spacer.Column numberOfSpaces={1} />
        <ButtonQuaternary
          title="Triggers all active buttons"
          icon={Close}
          isLoading={buttonIsLoading}
          onPress={onTriggerFakeLoading}
        />
        <Spacer.Column numberOfSpaces={1} />
        <ButtonQuaternary title="Se connecter" onPress={onButtonPress} icon={Close} disabled />
      </Section>
      <Spacer.Column numberOfSpaces={5} />

      {/* Modals */}
      <Typo.Title1 color={ColorsEnum.PRIMARY} onPress={toggleModals}>
        Modals
      </Typo.Title1>

      <Section visible={sectionsVisibility.modals}>
        <TouchableOpacity onPress={showBasicModal}>
          <Typo.Title4 color={ColorsEnum.TERTIARY}>Modal - Basic</Typo.Title4>
        </TouchableOpacity>
        <AppModal
          title="a basic modal"
          visible={basicModalVisible}
          leftIcon={ArrowPrevious}
          onLeftIconPress={hideBasicModal}
          rightIcon={Close}
          onRightIconPress={hideBasicModal}>
          <Text>A simple content</Text>
        </AppModal>
        <Spacer.Column numberOfSpaces={1} />
        <Typo.Title4>Modal - Progressive</Typo.Title4>
        <Spacer.Column numberOfSpaces={1} />
        <Typo.Title4>Modal Header</Typo.Title4>
        <ColoredModalHeader title="My modal header" leftIcon={ArrowPrevious} rightIcon={Close} />
      </Section>
      <Spacer.Column numberOfSpaces={5} />

      {/* Icons */}
      <Typo.Title1 color={ColorsEnum.PRIMARY} onPress={toggleIcons}>
        Icons
      </Typo.Title1>

      <Section visible={sectionsVisibility.icons}>
        <CategoryIcons />
        <AlignedText>
          <ArrowPrevious size={24} />
          <Text> - ArrowPrevious </Text>
        </AlignedText>
        <AlignedText>
          <ArrowNext size={24} />
          <Text> - ArrowNext </Text>
        </AlignedText>
        <AlignedText>
          <Check size={24} />
          <Text> - Check </Text>
        </AlignedText>
        <AlignedText>
          <Close size={24} />
          <Text> - Close </Text>
        </AlignedText>
        <AlignedText>
          <Eye size={24} />
          <Text> - Eye </Text>
        </AlignedText>
        <AlignedText>
          <EyeSlash size={24} />
          <Text> - EyeSlash </Text>
        </AlignedText>
        <AlignedText>
          <Logo size={24} />
          <Text> - Logo </Text>
        </AlignedText>
        <AlignedText>
          <BicolorLogo size={24} />
          <Text> - BicolorLogo </Text>
        </AlignedText>
        <AlignedText>
          <BicolorSearch size={24} />
          <Text> - BicolorSearch </Text>
        </AlignedText>
        <AlignedText>
          <BicolorBookings size={24} />
          <Text> - BicolorBookings </Text>
        </AlignedText>
        <AlignedText>
          <BicolorFavorite size={24} />
          <Text> - BicolorFavorite </Text>
        </AlignedText>
        <AlignedText>
          <BicolorProfile size={24} />
          <Text> - BicolorProfile </Text>
        </AlignedText>
        <AlignedText>
          <BicolorSelector width={24} />
          <Text> - BicolorSelector </Text>
        </AlignedText>
        <AlignedText>
          <UserCircle size={24} />
          <Text> - UserCircle </Text>
        </AlignedText>
        <AlignedText>
          <Email size={24} />
          <Text> - Email </Text>
        </AlignedText>
        <AlignedText>
          <ExternalSite size={24} />
          <Text> - External site </Text>
        </AlignedText>
        <AlignedText>
          <Warning size={24} />
          <Text> - Warning </Text>
        </AlignedText>
        <AlignedText>
          <SadFace size={24} />
          <Text> - SadFace </Text>
        </AlignedText>
        <AlignedText>
          <LocationPointer size={24} />
          <Text> - LocationPointer </Text>
        </AlignedText>
        <AlignedText>
          <Digital size={24} />
          <Text> - Digital </Text>
        </AlignedText>
      </Section>
      <Spacer.Column numberOfSpaces={5} />

      {/* Inputs */}
      <Typo.Title1 color={ColorsEnum.PRIMARY} onPress={toggleInputs}>
        Inputs
      </Typo.Title1>

      <Section visible={sectionsVisibility.inputs}>
        <Typo.Title4 color={ColorsEnum.TERTIARY}>Text Input</Typo.Title4>
        <TextInput value={inputText} onChangeText={setInputText} placeholder={'Placeholder'} />
        <Spacer.Column numberOfSpaces={1} />
        <InputRule
          title={'12 Caractères'}
          icon={inputText.length >= 12 ? Check : Close}
          color={inputText.length >= 12 ? ColorsEnum.GREEN_VALID : ColorsEnum.ERROR}
          iconSize={16}
        />
        <Spacer.Column numberOfSpaces={1} />
        <Typo.Title4 color={ColorsEnum.TERTIARY}>Text Input - Email</Typo.Title4>
        <TextInput
          value=""
          onChangeText={doNothingFn}
          placeholder={'Placeholder'}
          keyboardType="email-address"
        />
        <Spacer.Column numberOfSpaces={1} />
        <Typo.Title4 color={ColorsEnum.TERTIARY}>Text Input - Error</Typo.Title4>
        <TextInput value="" onChangeText={doNothingFn} placeholder={'Placeholder'} isError={true} />
        <Spacer.Column numberOfSpaces={1} />
        <Typo.Title4 color={ColorsEnum.TERTIARY}>Password Input</Typo.Title4>
        <PasswordInput value="" onChangeText={doNothingFn} placeholder={'Placeholder'} />
        <Spacer.Column numberOfSpaces={1} />
        <Typo.Title4 color={ColorsEnum.TERTIARY}>Partial Date Input</Typo.Title4>
        <Spacer.Column numberOfSpaces={1} />
        <PartialDateInput
          identifier={DatePartType.DAY}
          isValid={_partialDate.length === 4}
          maxLength={4}
          onChangeValue={setPartialDate}
          placeholder="AAAA"
        />
        <Spacer.Column numberOfSpaces={1} />
        <Typo.Title4 color={ColorsEnum.TERTIARY}>Date Input</Typo.Title4>
        <Spacer.Column numberOfSpaces={1} />
        <DateInput />
      </Section>
      <Spacer.Column numberOfSpaces={5} />

      {/* SnackBar */}
      <Typo.Title1 color={ColorsEnum.PRIMARY} onPress={toggleSnackbars}>
        SnackBar
      </Typo.Title1>

      <Section visible={sectionsVisibility.snackbars}>
        <TouchableOpacity onPress={popupSnackBarSuccess}>
          <Typo.Title4 color={ColorsEnum.GREEN_VALID}>
            Popup Sucess SnackBar for 5 seconds
          </Typo.Title4>
        </TouchableOpacity>
        <Spacer.Column numberOfSpaces={1} />
        <TouchableOpacity onPress={popupSnackBarInfos}>
          <Typo.Title4 color={ColorsEnum.ACCENT}>Popup Information SnackBar</Typo.Title4>
        </TouchableOpacity>
      </Section>
      <Spacer.Column numberOfSpaces={5} />

      {/* Create your category */}
      <Typo.Title1 color={ColorsEnum.PRIMARY} onPress={toggleComponents}>
        Your components
      </Typo.Title1>
      <Section visible={sectionsVisibility.components}>
        <AlignedText>
          <Text>
            <ExternalLink url="https://google.com" />
            <Text> - ExternalLink </Text>
          </Text>
        </AlignedText>
        <AlignedText>
          <Rectangle />
          <Text> - Rectangle </Text>
        </AlignedText>
      </Section>
      <Spacer.Column numberOfSpaces={5} />
      <Spacer.BottomScreen />
    </StyledScrollView>
  )
}

const AlignedText = styled(View)({
  flexDirection: 'row',
  alignItems: 'center',
})

const ColoredModalHeader = styled(ModalHeader).attrs({
  customStyles: {
    container: {
      backgroundColor: ColorsEnum.PRIMARY_DISABLED,
    },
  },
})``

const StyledScrollView = styled(ScrollView)({
  paddingHorizontal: getSpacing(5),
  backgroundColor: ColorsEnum.GREY_LIGHT,
})

function doNothingFn() {
  /* do nothing */
}

const Section = styled.View<{ visible: boolean }>(({ visible }) => ({
  display: visible ? 'flex' : 'none',
}))

const CategoryIcons = () => {
  return (
    <React.Fragment>
      <Text>{'Categories'}</Text>
      {[...Object.keys(AlgoliaCategory), null].map((category: string | null) => {
        const Icon = mapCategoryToIcon(category as AlgoliaCategory | null)
        return (
          <AlignedText key={category || "OEUVRE D'ART"}>
            <Icon size={24} color={ColorsEnum.GREY_DARK} />
            <Text> - {category || "OEUVRE D'ART"} </Text>
          </AlignedText>
        )
      })}
      <Text>{'\n'}</Text>
    </React.Fragment>
  )
}
