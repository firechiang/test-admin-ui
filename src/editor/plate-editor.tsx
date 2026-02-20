import {Plate, usePlateEditor} from 'platejs/react';

import {EditorKit} from '@/editor/editor-kit';
import {Editor, EditorContainer} from '@/components/ui/editor';
import type {VariantProps} from "class-variance-authority";
import type {editorVariants} from "@/components/ui/editor-static.tsx";


interface PlateEditorProps {
    onChange?: (value: any) => void;
    variant?: VariantProps<typeof editorVariants>['variant'];
}

export function PlateEditor({onChange, variant = 'default'}: PlateEditorProps) {
    const editor = usePlateEditor({
        plugins: EditorKit
    });

    return (
        <Plate onChange={onChange} editor={editor}>
            <EditorContainer>
                <Editor variant={variant}/>
            </EditorContainer>
        </Plate>
    );
}

