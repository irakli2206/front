import { Button, Modal, Text } from '@nextui-org/react'
import React from 'react'

type Props = {
    actionTitle: string
    visible: boolean
    modalTitle: string
    closeHandler: () => void
    actionHandler: () => void
}

const ActionModal = ({ visible, closeHandler, actionHandler, actionTitle, modalTitle }: Props) => {
    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
            blur
        >
            <Modal.Header>
                <Text b id="modal-title" size={18}>
                    {modalTitle}

                </Text>
            </Modal.Header>
            <Modal.Footer>
                <Button auto flat color="error" onPress={closeHandler}>
                    Close
                </Button>
                <Button auto flat  onPress={actionHandler}>
                    {actionTitle}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ActionModal