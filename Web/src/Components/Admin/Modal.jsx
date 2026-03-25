import '../../CSSComponents/Admin/Modal.css';

export default function Modal({ isOpen, onClose, title, children, actions }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header-custom">
          <h5>{title}</h5>
          <button className="modal-close" onClick={onClose}>
            <i className="fa fa-xmark"></i>
          </button>
        </div>

        <div className="modal-body-custom">{children}</div>

        {actions && <div className="modal-footer-custom">{actions}</div>}
      </div>
    </div>
  );
}