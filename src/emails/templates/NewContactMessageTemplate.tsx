import {
    Heading,
    Hr,
    Text,
} from '@react-email/components';
import BaseTemplate from './BaseTemplate';

interface NewContactMessageTemplateProps {
    name: string;
    email: string;
    subject: string;
    message: string;
    submittedAt: Date;
}

export default function NewContactMessageTemplate({
    name,
    email,
    subject,
    message,
    submittedAt
}: NewContactMessageTemplateProps) {
    return (
        <BaseTemplate preview={`Nouveau message de contact de ${name}`}>
            <Heading style={heading}>
                📬 Nouveau message de contact
            </Heading>
            
            <Text style={text}>
                Un nouveau message a été envoyé via le formulaire de contact du site.
            </Text>
            
            <div style={messageBox}>
                <div style={fieldRow}>
                    <Text style={fieldLabel}>Nom :</Text>
                    <Text style={fieldValue}>{name}</Text>
                </div>
                
                <div style={fieldRow}>
                    <Text style={fieldLabel}>Email :</Text>
                    <Text style={fieldValue}>
                        <a href={`mailto:${email}`} style={emailLink}>{email}</a>
                    </Text>
                </div>
                
                <div style={fieldRow}>
                    <Text style={fieldLabel}>Sujet :</Text>
                    <Text style={fieldValue}>{subject}</Text>
                </div>
                
                <div style={fieldRow}>
                    <Text style={fieldLabel}>Date :</Text>
                    <Text style={fieldValue}>
                        {submittedAt.toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </Text>
                </div>
                
                <Hr style={hr} />
                
                <div style={messageSection}>
                    <Text style={fieldLabel}>Message :</Text>
                    <div style={messageContent}>
                        {message.split('\n').map((line, index) => (
                            <Text key={index} style={messageLine}>
                                {line || '\u00A0'}
                            </Text>
                        ))}
                    </div>
                </div>
            </div>
            
            <Text style={actionText}>
                <strong>Actions recommandées :</strong>
            </Text>
            
            <ul style={actionList}>
                <li>📧 Répondre directement à l'adresse : <a href={`mailto:${email}`} style={emailLink}>{email}</a></li>
                <li>📝 Archiver ce message dans votre système de gestion</li>
                <li>⏰ Répondre dans les 24-48h pour maintenir une bonne relation client</li>
            </ul>
            
            <Text style={footerNote}>
                Ce message a été envoyé automatiquement depuis le formulaire de contact du site 
                <a href="https://guerirettemoignerensemble.fr" style={siteLink}>
                    guerirettemoignerensemble.fr
                </a>
            </Text>
        </BaseTemplate>
    );
}

// Styles
const heading = {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center' as const,
    margin: '0 0 30px',
};

const text = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333333',
    margin: '0 0 20px',
};

const messageBox = {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e5e5',
    borderRadius: '8px',
    padding: '25px',
    margin: '20px 0',
};

const fieldRow = {
    margin: '0 0 15px',
};

const fieldLabel = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#666666',
    margin: '0 0 5px',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
};

const fieldValue = {
    fontSize: '16px',
    lineHeight: '1.5',
    color: '#333333',
    margin: '0',
};

const emailLink = {
    color: '#d4af37',
    textDecoration: 'none',
    fontWeight: 'bold',
};

const hr = {
    borderColor: '#e5e5e5',
    margin: '20px 0',
};

const messageSection = {
    margin: '20px 0 0',
};

const messageContent = {
    backgroundColor: '#f8f9fa',
    border: '1px solid #e9ecef',
    borderRadius: '5px',
    padding: '15px',
    margin: '10px 0 0',
};

const messageLine = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333333',
    margin: '0 0 8px',
};

const actionText = {
    fontSize: '16px',
    color: '#333333',
    margin: '25px 0 10px',
};

const actionList = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333333',
    margin: '0 0 25px',
    paddingLeft: '20px',
};

const footerNote = {
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#666666',
    textAlign: 'center' as const,
    margin: '30px 0 0',
    fontStyle: 'italic',
};

const siteLink = {
    color: '#d4af37',
    textDecoration: 'none',
};