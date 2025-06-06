import {
    Button,
    Heading,
    Text,
} from '@react-email/components';
import BaseTemplate from './BaseTemplate';

interface PaymentFailedTemplateProps {
    customerName: string;
    orderNumber: string;
    amount: number;
    errorMessage?: string;
}

export default function PaymentFailedTemplate({
    customerName,
    orderNumber,
    amount,
    errorMessage
}: PaymentFailedTemplateProps) {
    return (
        <BaseTemplate preview={`Problème avec votre paiement - Commande ${orderNumber}`}>
            <Heading style={heading}>
                Un problème est survenu avec votre paiement 😔
            </Heading>
            
            <Text style={text}>
                Bonjour {customerName},
            </Text>
            
            <Text style={text}>
                Nous vous écrivons concernant votre commande <strong>{orderNumber}</strong> 
                d'un montant de <strong>{amount.toFixed(2)}€</strong>.
            </Text>
            
            <div style={errorBox}>
                <Text style={errorTitle}>
                    ⚠️ Paiement non abouti
                </Text>
                <Text style={errorText}>
                    Malheureusement, le paiement de votre commande n'a pas pu être traité avec succès.
                    {errorMessage && (
                        <>
                            <br /><br />
                            <strong>Détail :</strong> {errorMessage}
                        </>
                    )}
                </Text>
            </div>
            
            <Text style={text}>
                <strong>Pas d'inquiétude !</strong> Cela peut arriver pour plusieurs raisons :
            </Text>
            
            <ul style={list}>
                <li>🏦 Fonds insuffisants sur votre compte</li>
                <li>🔒 Sécurité bancaire activée</li>
                <li>📱 Problème technique temporaire</li>
                <li>💳 Informations de carte incorrectes</li>
            </ul>
            
            <Text style={text}>
                <strong>Que faire maintenant ?</strong>
            </Text>
            
            <Text style={text}>
                Vous pouvez facilement relancer votre commande en retournant sur notre site. 
                Vos informations sont sauvegardées et le processus sera rapide.
            </Text>
            
            <div style={buttonContainer}>
                <Button
                    href="https://guerirettemoignerensemble.fr/oeuvres"
                    style={button}
                >
                    Relancer ma commande
                </Button>
            </div>
            
            <Text style={text}>
                Si le problème persiste ou si vous avez des questions, 
                n'hésitez pas à nous contacter directement à l'adresse : 
                <a href="mailto:merveillegrace-helene@outlook.com" style={link}>
                    merveillegrace-helene@outlook.com
                </a>
            </Text>
            
            <Text style={text}>
                Nous serons ravis de vous aider à finaliser votre achat et vous faire découvrir nos œuvres.
            </Text>
            
            <Text style={signature}>
                Avec toute ma compréhension,<br />
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

const errorBox = {
    backgroundColor: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0',
};

const errorTitle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#dc2626',
    margin: '0 0 10px',
    textAlign: 'center' as const,
};

const errorText = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#7f1d1d',
    margin: '0',
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

const link = {
    color: '#d4af37',
    textDecoration: 'none',
};

const signature = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333333',
    margin: '30px 0 0',
    textAlign: 'center' as const,
};