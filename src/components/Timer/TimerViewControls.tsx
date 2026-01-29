import { Button, Group, lighten } from "@mantine/core";
import { type FC, memo } from "react";
import { RiFullscreenFill, RiPictureInPictureFill } from "react-icons/ri";

interface TimerViewControlsProps {
    handlePictureInPicture: () => void;
    handleFullScreen: () => void;
    isPiPOpen: boolean;
}

const TimerViewControls: FC<TimerViewControlsProps> = ({ handlePictureInPicture, handleFullScreen, isPiPOpen }) => {
    return (
        <Group
            gap="sm"
            style={(theme) => ({
                width: "100%",
                justifyContent: "center",
            })}
        >
            <Button
                size="sm"
                variant="subtle"
                title="Picture-in-Picture (Shift+I)"
                color="gray.0"
                onClick={handlePictureInPicture}
                style={(theme) => ({
                    ...(isPiPOpen && {
                        backgroundColor: theme.colors.red[5],
                    }),
                })}
            >
                <RiPictureInPictureFill size={18} />
            </Button>
            <Button
                size="sm"
                variant="subtle"
                title="Full Screen (F)"
                color="gray.0"
                onClick={handleFullScreen}
            >
                <RiFullscreenFill size={18} />
            </Button>
        </Group>
    )
}

export default memo(TimerViewControls);