interface ThankYouProps {
  name: string;
}

export const ThankYouTemplate = ({ name }: ThankYouProps) => (
  <div className="thank-you-container">
    <div className="thank-you-card">
      <div className="thank-you-icon">
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h1 className="thank-you-title">
        Thank You, {name}!
      </h1>
      <p className="thank-you-message">
        We've received your inquiry and our team will get back to you within 24-48 hours.
      </p>
      <div className="thank-you-divider"></div>
      <p className="thank-you-footer">
        In the meantime, feel free to explore our website or follow us on social media.
      </p>
    </div>
    <style >{`
      .thank-you-container {
        min-height: 100vh;
        background-color: #f9fafb;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
      }
      .thank-you-card {
        background-color: white;
        border-radius: 0.75rem;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        padding: 2rem;
        max-width: 28rem;
        width: 100%;
        text-align: center;
      }
      .thank-you-icon {
        margin-bottom: 1.5rem;
      }
      .thank-you-icon svg {
        width: 4rem;
        height: 4rem;
        margin: 0 auto;
        color: #10b981;
      }
      .thank-you-title {
        font-size: 1.875rem;
        font-weight: 700;
        color: #111827;
        margin-bottom: 1rem;
        line-height: 1.2;
      }
      .thank-you-message {
        color: #4b5563;
        margin-bottom: 1.5rem;
        line-height: 1.625;
      }
      .thank-you-divider {
        border-top: 1px solid #e5e7eb;
        margin: 1.5rem 0;
      }
      .thank-you-footer {
        font-size: 0.875rem;
        color: #6b7280;
      }
    `}</style>
  </div>
);
