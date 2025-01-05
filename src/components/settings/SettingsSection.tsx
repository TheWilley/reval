export default function SettingsSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <>
      <div className='mb-5 w-full bg-base-200 p-5'>
        {title && <h4 className='text-md mb-2 font-bold'>{title}</h4>}
        {children}
      </div>
    </>
  );
}
