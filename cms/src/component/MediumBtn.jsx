// src/components/MediumBtn.jsx
export default function MediumBtn({ tag, type, onClick }) {
  return (
    <button
      // Sangat penting: gunakan props type. Jika tidak ada, default ke "button"
      type={type || "button"} 
      onClick={onClick}
      className={`btn w-100 ${tag === 'Submit' ? 'btn-primary' : 'btn-outline-secondary'}`}
    >
      {tag}
    </button>
  );
}