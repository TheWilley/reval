import { cloneElement, PropsWithChildren, ReactElement } from 'react';

function Dialog({
  id,
  header,
  children,
  toggleElement,
}: PropsWithChildren<{
  id: string;
  toggleElement: ReactElement;
  header?: string;
}>) {
  const handleToggleClick = () => {
    const dialog = document.getElementById(id) as HTMLDialogElement;
    if (dialog) {
      dialog.open ? dialog.close() : dialog.showModal();
    }
  };

  const clonedToggleElement = cloneElement(toggleElement, {
    onClick: handleToggleClick,
  });

  return (
    <>
      {clonedToggleElement}
      <dialog id={id} className='modal'>
        <div className='modal-box bg-base-300'>
          <form method='dialog'>
            <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>
              ✕
            </button>
          </form>
          {header && <h3 className='mb-4 text-center text-lg font-bold'>{header}</h3>}
          {children}
        </div>
      </dialog>
    </>
  );
}

export default Dialog;
