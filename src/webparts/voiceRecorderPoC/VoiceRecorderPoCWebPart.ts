import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import VoiceRecorderPoC, { IVoiceRecorderPoCProps } from "./components/VoiceRecorderPoC";
import UploadService from "./services/UploaderService";

export interface IVoiceRecorderPoCWebPartProps {
    description: string;
}

export default class VoiceRecorderPoCWebPart extends BaseClientSideWebPart<IVoiceRecorderPoCWebPartProps> {
    private uploadService: UploadService;

    public render(): void {
        const element: React.ReactElement<IVoiceRecorderPoCProps> = React.createElement(VoiceRecorderPoC, {
            uploadService: this.uploadService
        });

        ReactDom.render(element, this.domElement);
    }

    protected onInit(): Promise<void> {
        this.uploadService = this.context.serviceScope.consume(UploadService.serviceKey);

        return super.onInit();
    }

    protected onDispose(): void {
        ReactDom.unmountComponentAtNode(this.domElement);
    }

    protected get dataVersion(): Version {
        return Version.parse("1.0");
    }
}
