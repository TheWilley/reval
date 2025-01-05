import { PluginOption } from '../types/types';

type OptionsProps = {
  options?: PluginOption;
  onChange?: (key: string, value: string) => void;
  id: number;
};

function PluginOptions({ options, id, onChange }: OptionsProps) {
  const handleInputChange = (key: string, value: string) => {
    if (onChange) {
      onChange(key, value);
    }
  };

  if (!options || Object.keys(options).length === 0) {
    return;
  }

  return (
    <>
      <button
        className='btn-sm mb-2 mt-2 w-full max-w-[8em] rounded-md bg-base-100 px-3 py-1 hover:brightness-[98%]'
        onClick={() =>
          (
            document.getElementById(`options-modal-${id}`) as HTMLDialogElement
          ).showModal()
        }
      >
        Options
      </button>
      <dialog id={`options-modal-${id}`} className='modal'>
        <div className='modal-box bg-base-300'>
          {Object.entries(options).map(([key, option]) => (
            <div key={key} style={{ marginBottom: '1rem' }}>
              <label htmlFor={key} className='form-control'>
                <div className='label'>
                  <span className='label-text'>{option.name}</span>
                </div>
                {option.type === 'string' && (
                  <input
                    id={key}
                    className='input'
                    type='text'
                    value={option.value}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                )}
                {option.type === 'boolean' && (
                  <input
                    id={key}
                    className='checkbox'
                    type='checkbox'
                    checked={option.value === 'true'}
                    onChange={(e) => handleInputChange(key, e.target.checked.toString())}
                  />
                )}
                {option.type === 'number' && (
                  <input
                    id={key}
                    className='input'
                    type='number'
                    value={option.value}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                )}
              </label>
            </div>
          ))}
        </div>
      </dialog>
    </>
  );
}

export default PluginOptions;
