export default function DeleteProduct({ children }) {
  return (
    <button 
      type='button'
      onClick={() => {
        // * https://stackoverflow.com/questions/19404352/difference-between-window-confirm-and-just-confirm
        if (confirm('Are you sure you want to delete this item?')) {
          console.log('deleted');
        }
      }}
    >
      {children}
    </button>
  );
};