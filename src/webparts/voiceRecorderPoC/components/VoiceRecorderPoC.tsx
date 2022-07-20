import * as React from "react";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";

import UploadService from "../services/UploaderService";

import RecorderWrapper from "./Recorder/RecorderWrapper";
import styles from "./VoiceRecorderPoC.module.scss";

export interface IVoiceRecorderPoCProps {
    uploadService: UploadService;
}

const VoiceRecorderPoC: React.FC<IVoiceRecorderPoCProps> = ({ uploadService }) => {
    const [uploading, setUploading] = React.useState<boolean>(false);
    const [uploadStatus, setUploadStatus] = React.useState<{ message: string; status?: boolean }>();

    const uploadAudio = async (file: File) => {
        setUploading(true);
        setUploadStatus({ message: "" });

        const isUploaded = await uploadService.uploadFile(file, "my-audio.mp3");

        setUploadStatus({
            message: isUploaded ? "Uploaded successfully" : "Failed to upload your record to document library. Try again or contact administrator.",
            status: isUploaded
        });

        setUploading(false);
    };

    return (
        <div className={styles.voiceRecorderWrapper} style={{ opacity: uploading ? 0.8 : 1 }}>
            {uploading && (
                <div className={styles.uploading}>
                    <Spinner size={SpinnerSize.large} />
                </div>
            )}
            <RecorderWrapper onAudioUpload={uploadAudio} onReset={() => setUploadStatus({ message: "" })} />
            {uploadStatus?.message && <div className={uploadStatus.status ? styles.success : styles.error}>{uploadStatus.message}</div>}
        </div>
    );
};

export default VoiceRecorderPoC;
