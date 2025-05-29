import { ReactNode } from 'react';

export default function SnippetsLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
      <div id="modal-root" />
    </>
  );
}
