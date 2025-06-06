import {
    Heading,
    Text,
} from '@react-email/components';
import BaseTemplate from './BaseTemplate';

interface ContactConfirmationTemplateProps {
    name: string;
}

export default function ContactConfirmationTemplate({
    name,
}: ContactConfirmationTemplateProps) {
    return (
        <BaseTemplate preview="Confirmation de réception de votre message">
            <Heading style={heading}>
                Message bien reçu ! ✉️
            </Heading>

            <Text style={text}>
                Bonjour {name},
            </Text>

            <Text style={text}>
                Nous avons bien reçu votre message. Merveille Grâce LUTETE vous répondra dans les plus brefs délais.
            </Text>

            <Text style={text}>
                Merci pour votre confiance 🙏
            </Text>
        </BaseTemplate>
    );
}

// Styles
const heading = {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center' as const,
    margin: '0 0 30px',
    color: '#333333',
};

const text = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333333',
    margin: '0 0 20px',
}; 