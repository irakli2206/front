import { Button, Modal, styled, Text } from '@nextui-org/react'
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

    const onSave = () => {
        localStorage.set('settings', JSON.stringify(settings))
    }

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
            blur
        >
            <Modal.Header>
                <Text b id="modal-title"  size={32}>
                    Settings

                </Text>
            </Modal.Header>
            <Modal.Body>
                <Text size={24}>Map Zoom </Text>
                <RangeContainer>

                    <RangePicker min={2} max={16}  type='range' value={settings.mapZoom} 
                    onChange={(e) => setSettings(prev => ({...prev, mapZoom: +e.target.value }))} />
                    <Text>{settings.mapZoom}</Text>
                </RangeContainer>
                <Text css={{my: '$12', mb: '$8'}} size={24}>Maximum Displayed Posts</Text>
                <RangeContainer>

                    <RangePicker min={1} max={100}  type='range' value={settings.maxVisiblePosts} 
                    onChange={(e) => setSettings(prev => ({...prev, maxVisiblePosts: +e.target.value }))} />
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
    '&[type=range]::-webkit-slider-runnable-track': {
        color: 'red',
        appearance: 'none'
    }
})

export default SettingsModal