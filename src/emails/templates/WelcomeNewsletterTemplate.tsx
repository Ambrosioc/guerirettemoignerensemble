import {
    Button,
    Heading,
    Text,
} from '@react-email/components';
import BaseTemplate from './BaseTemplate';

interface WelcomeNewsletterTemplateProps {
    email: string;
}

export default function WelcomeNewsletterTemplate({ email }: WelcomeNewsletterTemplateProps) {
    return (
        <BaseTemplate preview="Bienvenue dans notre communauté !">
            <Heading style={heading}>
                Bienvenue dans notre communauté ! 🌟
            </Heading>
            
            <Text style={text}>
                Bonjour et merci de vous être inscrit(e) à notre newsletter !
            </Text>
            
            <Text style={text}>
                Vous recevrez désormais nos dernières publications, réflexions spirituelles, 
                et les actualités autour des œuvres de Merveille Grâce LUTETE.
            </Text>
            
            <Text style={text}>
                En tant que membre de notre communauté, vous serez les premiers informés :
            </Text>
            
            <ul style={list}>
                <li>📚 Des nouvelles publications et sorties de livres</li>
                <li>✨ Des articles exclusifs sur la spiritualité et le développement personnel</li>
                <li>🎯 Des témoignages inspirants et des réflexions profondes</li>
                <li>📅 Des événements et dédicaces à venir</li>
            </ul>
            
            <Text style={text}>
                Nous sommes ravis de vous compter parmi nous dans cette aventure de guérison et de témoignage.
            </Text>
            
            <div style={buttonContainer}>
                <Button
                    href="https://guerirettemoignerensemble.fr/blog"
                    style={button}
                >
                    Découvrir nos derniers articles
                </Button>
            </div>
            
            <Text style={signature}>
                Avec toute ma gratitude,<br />
                <strong>Merveille Grâce LUTETE</strong>
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
    margin: '0 0 16px',
};

const list = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333333',
    margin: '0 0 16px',
    paddingLeft: '20px',
};

const buttonContainer = {
    textAlign: 'center' as const,
    margin: '30px 0',
};

const button = {
    backgroundColor: '#d4af37',
    borderRadius: '25px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: 'bold',
    textDecoration: 'none',
    textAlign: 'center' as const,
    display: 'inline-block',
    padding: '12px 24px',
};

const signature = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333333',
    margin: '30px 0 0',
    textAlign: 'center' as const,
};