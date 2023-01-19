import { Button, Modal, Radio, styled, Text } from '@nextui-org/react'
import React, { useState } from 'react'
import { Settings } from '../types/types'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

type Props = {
    visible: boolean
    closeHandler: () => void
    actionHandler: (savedSettings: Settings) => void
}

//@ts-ignore
const localStorageSettings: Settings = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings')) : {}

const SettingsModal = ({ visible, closeHandler, actionHandler }: Props) => {
    const [settings, setSettings] = useState<Settings>({
        mapStyle: localStorageSettings && localStorageSettings.mapStyle ? localStorageSettings.mapStyle : 'light',
        maxVisiblePosts: 
        localStorageSettings && localStorageSettings.maxVisiblePosts ? localStorageSettings.maxVisiblePosts : 30
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
                <Text b id="modal-title" size={32}>
                    Settings

                </Text>
            </Modal.Header>
            <Modal.Body>
                <Text size={24}>Map Style</Text>
                <RangeContainer>
                    <Radio.Group orientation="horizontal" defaultValue="primary" value={settings.mapStyle}
                        onChange={(e) => setSettings(prev => ({ ...prev, mapStyle: e as 'light' | 'dark' }))}
                    >
                        <Radio value="light"   >
                            Light
                        </Radio>
                        <Radio value="dark"  >
                            Dark
                        </Radio>
                    </Radio.Group>
                </RangeContainer>
                <Text css={{ my: '$12', mb: '$8' }} size={24}>Maximum Displayed Posts</Text>
                <RangeContainer  >

                    <RangePicker min={1} max={50} type='range' value={settings.maxVisiblePosts}
                        onChange={(e) => setSettings(prev => ({ ...prev, maxVisiblePosts: +e.target.value }))}

                    />
                    <Text>{settings.maxVisiblePosts}</Text>
                </RangeContainer>
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

const RangeContainer = styled('div', {
    display: 'flex',
    width: '100%',
    gap: '$4',
    '& *::-webkit-slider-runnable-track': {
        color: 'red',
        appearance: 'none'
    }
})

const RangePicker = styled('input', {
    width: '100%',
})

export default SettingsModal