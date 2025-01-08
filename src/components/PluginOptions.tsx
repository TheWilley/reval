import { PluginOption } from '../types/types';
import Dialog from './Dialog';

function PluginOptions({
  options,
  id,
  onChange,
}: {
  options?: PluginOption;
  onChange?: (key: string, value: string) => void;
  id: number;
}) {
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
      <Dialog
        id={`options_modal-${id}`}
        toggleElement={
          <button className='btn-sm mb-2 mt-2 w-full max-w-[8em] rounded-md bg-base-100 px-3 py-1 hover:brightness-[98%]'>
            Options
          </button>
        }
      >
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
                  value={option.value as string}
                  placeholder={option.placeholderText}
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
                  value={option.value as number}
                  placeholder={option.placeholderText}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              )}
              {option.type === 'select' && (
                <select
                  id={key}
                  className='select'
                  value={option.value as string}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                >
                  {option.options?.map((option, index) => (
                    <option value={option} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </label>
          </div>
        ))}
      </Dialog>
    </>
  );
}

export default PluginOptions;
