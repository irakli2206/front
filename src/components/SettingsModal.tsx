import { Button, Modal, Text } from '@nextui-org/react'
import React, { useState } from 'react'
import { Settings } from '../types/types'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

type Props = {
    visible: boolean
    closeHandler: () => void
    actionHandler: (savedSettings: Settings) => void
}

const SettingsModal = ({ visible, closeHandler, actionHandler }: Props) => {
    const [settings, setSettings] = useState<Settings>({
        mapZoom: 6,
        maxVisiblePosts: 30
    })

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
                    Settings

                </Text>
            </Modal.Header>
            <Modal.Body>
                <RangeSlider value={settings.mapZoom} />

            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onPress={closeHandler}>
                    Cancel
                </Button>
                <Button auto flat onPress={() => actionHandler(settings)}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SettingsModal