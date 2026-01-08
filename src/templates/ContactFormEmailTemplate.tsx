// templates/ContactFormEmail.tsx
interface ContactFormEmailProps {
  name: string;
  email: string;
  phone: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

export const ContactFormEmail = ({
  name,
  email,
  phone,
  company,
  projectType,
  budget,
  timeline,
  message,
}: ContactFormEmailProps) => (
  <div className="contact-email-container">
    <h1 className="contact-email-title">New Contact Form Submission</h1>

    <div className="contact-email-grid">
      <div className="contact-email-row">
        {
          name &&
          <>
            <div className="contact-email-label">Name:</div>
            <div className="contact-email-value">{name}</div>
          </>
        }
      </div>

      <div className="contact-email-row">

        {
          email &&
          <>

            <div className="contact-email-label">Email:</div>
            <div className="contact-email-value">{email}</div>
          </>
        }
      </div>

      <div className="contact-email-row">
        {phone &&
          <>

            <div className="contact-email-label">Phone:</div>
            <div className="contact-email-value">{phone}</div>
          </>
        }
      </div>

      {company && (
        <div className="contact-email-row">
          <div className="contact-email-label">Company:</div>
          <div className="contact-email-value">{company}</div>
        </div>
      )}

      <div className="contact-email-row">
        <div className="contact-email-label">Project Type:</div>
        <div className="contact-email-value">{projectType}</div>
      </div>

      <div className="contact-email-row">
        <div className="contact-email-label">Budget:</div>
        <div className="contact-email-value">{budget}</div>
      </div>

      <div className="contact-email-row">
        <div className="contact-email-label">Timeline:</div>
        <div className="contact-email-value">{timeline}</div>
      </div>

      <div className="contact-email-row">
        <div className="contact-email-label">Message:</div>
        <div className="contact-email-value message-content">{message}</div>
      </div>
    </div>

    <div className="contact-email-footer">
      <p>This message was sent from your website's contact form.</p>
    </div>

    <style>{`
      .contact-email-container {
        background-color: white;
        padding: 1.5rem;
        max-width: 42rem;
        margin: 0 auto;
      }
      .contact-email-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #1f2937;
        margin-bottom: 1.5rem;
      }
      .contact-email-grid {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }
      .contact-email-row {
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }
      @media (min-width: 640px) {
        .contact-email-row {
          grid-template-columns: 1fr 2fr;
          gap: 1rem;
        }
      }
      .contact-email-label {
        font-weight: 500;
        color: #374151;
      }
      .contact-email-value {
        color: #4b5563;
      }
      .message-content {
        white-space: pre-line;
      }
      .contact-email-footer {
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid #e5e7eb;
      }
      .contact-email-footer p {
        font-size: 0.875rem;
        color: #6b7280;
      }
    `}</style>
  </div>
);
