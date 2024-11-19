'use client';

import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  UnderlinePlugin,
} from '@udecode/plate-basic-marks/react';
import { BlockquotePlugin } from '@udecode/plate-block-quote/react';
import { CodeBlockPlugin } from '@udecode/plate-code-block/react';
import { Plate, usePlateEditor } from '@udecode/plate-common/react';
import { HeadingPlugin } from '@udecode/plate-heading/react';
import { MarkdownPlugin } from '@udecode/plate-markdown';

import { Button } from '@/components/plate-ui/button';
import { Editor } from '@/components/plate-ui/editor';

export function PlateEditor() {
  const editor = usePlateEditor({
    id: 'plate-editor',
    plugins: [
      HeadingPlugin,
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      CodePlugin,
      BlockquotePlugin,
      CodeBlockPlugin,
      MarkdownPlugin,
    ],
    override: {},
    value: [
      {
        id: '1',
        type: 'p',
        children: [{ text: '' }],
      },
    ],
  });

  const handleGetValue = () => {
    const rawValue = editor.children;
    const markdownValue = editor.api.markdown.serialize();
    console.log('原始内容:', rawValue);
    console.log('Markdown内容:', markdownValue);
  };

  const handleSetValue = () => {
    const newValue = [
      {
        id: '2',
        type: 'p',
        children: [{ text: '这是新设置的内容' }],
      },
    ];
    editor.children = newValue;
  };

  const handleSendRequest = async () => {
    try {
      const response = await fetch('/api/save-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editor.children }),
      });
      const data = await response.json();
      console.log('请求响应:', data);
    } catch (error) {
      console.error('发送请求失败:', error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Plate editor={editor}>
        <Editor placeholder="Type your message here." />
      </Plate>

      <div className="flex gap-2">
        <Button onClick={handleGetValue}>获取内容</Button>
        <Button onClick={handleSetValue}>设置内容</Button>
        <Button onClick={handleSendRequest}>发送请求</Button>
      </div>
    </div>
  );
}
