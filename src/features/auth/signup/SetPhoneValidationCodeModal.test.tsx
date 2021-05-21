import React from 'react'
import { useMutation } from 'react-query'
import { mocked } from 'ts-jest/utils'
import waitForExpect from 'wait-for-expect'

import {
  SetPhoneValidationCodeModal,
  SetPhoneValidationCodeModalProps,
} from 'features/auth/signup/SetPhoneValidationCodeModal'
import { contactSupport } from 'features/auth/support.services'
import { act, fireEvent, render, useMutationFactory } from 'tests/utils'
import * as ModalModule from 'ui/components/modals/useModal'
import { ColorsEnum } from 'ui/theme'

jest.mock('react-query')

const mockedUseMutation = mocked(useMutation)
const useMutationCallbacks: { onError: (error: unknown) => void; onSuccess: () => void } = {
  onSuccess: () => {},
  onError: () => {},
}

describe('SetPhoneNumberValidationCodeModal', () => {
  beforeEach(() => {
    // @ts-ignore ts(2345)
    mockedUseMutation.mockImplementationOnce(useMutationFactory(useMutationCallbacks))
  })

  describe('modal header', () => {
    it('should open the quit modal on press right icon', () => {
      const visible = false
      const showModal = jest.fn()
      const uselessFunction = jest.fn()

      const useModalMock = jest.spyOn(ModalModule, 'useModal').mockReturnValue({
        visible,
        showModal,
        hideModal: uselessFunction,
        toggleModal: uselessFunction,
      })

      const { getByTestId } = renderSetPhoneValidationCode()

      const rightIconButton = getByTestId('rightIconButton')

      rightIconButton.props.onClick()
      expect(showModal).toBeCalled()

      useModalMock.mockRestore()
    })

    it('should call onGoBack property on press left arrow', () => {
      const mockOnGoBack = jest.fn()
      const { getByTestId } = renderSetPhoneValidationCode({ onGoBack: mockOnGoBack })

      const leftArrow = getByTestId('leftIconButton')
      fireEvent.press(leftArrow)
      expect(mockOnGoBack).toHaveBeenCalled()
    })
  })

  describe('Contact support button', () => {
    it('should open mail app when clicking on contact support button', async () => {
      const { getByText } = renderSetPhoneValidationCode()

      const contactSupportButton = getByText('Contacter le support')
      fireEvent.press(contactSupportButton)

      await waitForExpect(() => {
        expect(contactSupport.forPhoneNumberConfirmation).toHaveBeenCalled()
      })
    })
  })

  describe('Continue button', () => {
    it('should enable continue button if input is valid and complete', async () => {
      const { getByTestId } = renderModalWithFilledCodeInput('123456')
      const continueButton = getByTestId('button-container-continue')

      await waitForExpect(() => {
        expect(continueButton.props.style.backgroundColor).toEqual(ColorsEnum.PRIMARY)
      })
    })

    it.each([
      ['empty', ''],
      ['includes string', 's09453'],
      ['is too short', '54'],
    ])('should not enable continue button when "%s"', async (_reason, codeTyped) => {
      const { getByTestId } = renderModalWithFilledCodeInput(codeTyped)
      const continueButton = getByTestId('button-container-continue')

      await waitForExpect(() => {
        expect(continueButton.props.style.backgroundColor).toEqual(ColorsEnum.GREY_LIGHT)
      })
    })

    it('should dismiss modal if validate phone number request succeeds', () => {
      const mockDismissModal = jest.fn()
      const { getByTestId } = renderModalWithFilledCodeInput('123456', {
        dismissModal: mockDismissModal,
      })
      const continueButton = getByTestId('button-container-continue')

      fireEvent.press(continueButton)
      useMutationCallbacks.onSuccess()

      expect(mockDismissModal).toHaveBeenCalled()
    })

    it('should display input error message if validate phone number request fails', async () => {
      const response = {
        content: { code: 'INVALID_VALIDATION_CODE', message: 'Le code est invalide' },
        name: 'ApiError',
      }

      const { getByTestId, getByText } = renderModalWithFilledCodeInput('123456')
      const continueButton = getByTestId('button-container-continue')

      fireEvent.press(continueButton)

      await act(async () => {
        useMutationCallbacks.onError(response)
      })

      const errorMessage = getByText('Le code est invalide')
      await waitForExpect(() => {
        expect(errorMessage).toBeTruthy()
      })
    })
  })
})

function renderSetPhoneValidationCode(customProps?: Partial<SetPhoneValidationCodeModalProps>) {
  const props = {
    dismissModal: jest.fn(),
    visible: true,
    phoneNumber: '0612345678',
    onGoBack: jest.fn(),
    ...customProps,
  }
  return render(<SetPhoneValidationCodeModal {...props} />)
}

function renderModalWithFilledCodeInput(
  code: string,
  customProps?: Partial<SetPhoneValidationCodeModalProps>
) {
  const renderAPI = renderSetPhoneValidationCode(customProps)
  for (let i = 0; i < code.length; i++) {
    fireEvent.changeText(renderAPI.getByTestId(`input-${i}`), code[i])
    renderAPI.rerender(
      <SetPhoneValidationCodeModal
        dismissModal={jest.fn()}
        visible={true}
        phoneNumber={'0612345678'}
        onGoBack={jest.fn()}
      />
    )
  }
  return renderAPI
}