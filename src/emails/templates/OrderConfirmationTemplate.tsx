import {
    Button,
    Heading,
    Hr,
    Text,
} from '@react-email/components';
import BaseTemplate from './BaseTemplate';

interface OrderItem {
    title: string;
    price: number;
    quantity: number;
}

interface OrderConfirmationTemplateProps {
    customerName: string;
    orderNumber: string;
    items: OrderItem[];
    total: number;
    shippingAddress: string;
}

export default function OrderConfirmationTemplate({
    customerName,
    orderNumber,
    items,
    total,
    shippingAddress
}: OrderConfirmationTemplateProps) {
    return (
        <BaseTemplate preview={`Confirmation de votre commande ${orderNumber}`}>
            <Heading style={heading}>
                Merci pour votre commande ! 📚
            </Heading>

            <Text style={text}>
                Bonjour {customerName},
            </Text>

            <Text style={text}>
                Nous avons bien reçu votre commande et nous vous en remercions.
                Voici le récapitulatif de votre achat :
            </Text>

            <div style={orderBox}>
                <Text style={orderNumberStyle}>
                    <strong>Commande n° {orderNumber}</strong>
                </Text>

                <Hr style={hr} />

                {items.map((item, index) => (
                    <div key={index} style={itemRow}>
                        <Text style={itemName}>{item.title}</Text>
                        <Text style={itemDetails}>
                            Quantité: {item.quantity} × {item.price.toFixed(2)}€
                        </Text>
                        <Text style={itemPrice}>
                            {(item.quantity * item.price).toFixed(2)}€
                        </Text>
                    </div>
                ))}

                <Hr style={hr} />

                <div style={totalRow}>
                    <Text style={totalLabel}>Total :</Text>
                    <Text style={totalPrice}>{total.toFixed(2)}€</Text>
                </div>
            </div>

            <Text style={sectionTitle}>
                <strong>Adresse de livraison :</strong>
            </Text>
            <Text style={address}>
                {shippingAddress}
            </Text>

            <Text style={text}>
                Votre commande sera traitée dans les plus brefs délais.
                Vous recevrez un email de confirmation d'expédition avec le numéro de suivi
                dès que votre colis sera pris en charge par notre transporteur.
            </Text>

            <div style={buttonContainer}>
                <Button
                    href="https://guerirettemoignerensemble.fr/oeuvres"
                    style={button}
                >
                    Découvrir nos autres œuvres
                </Button>
            </div>

            <Text style={text}>
                Si vous avez des questions concernant votre commande,
                n'hésitez pas à nous contacter à l'adresse :
                <a href="mailto:merveillegrace-helene@outlook.com" style={link}>
                    merveillegrace-helene@outlook.com
                </a>
            </Text>

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

const orderBox = {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e5e5',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0',
};

const orderNumberStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#d4af37',
    textAlign: 'center' as const,
    margin: '0 0 15px',
};

const hr = {
    borderColor: '#e5e5e5',
    margin: '15px 0',
};

const itemRow = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '10px 0',
};

const itemName = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333333',
    margin: '0',
    flex: '1',
};

const itemDetails = {
    fontSize: '14px',
    color: '#666666',
    margin: '0',
    textAlign: 'center' as const,
    flex: '1',
};

const itemPrice = {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333333',
    margin: '0',
    textAlign: 'right' as const,
    flex: '0 0 80px',
};

const totalRow = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '15px 0 0',
};

const totalLabel = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333333',
    margin: '0',
};

const totalPrice = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#d4af37',
    margin: '0',
};

const sectionTitle = {
    fontSize: '16px',
    color: '#333333',
    margin: '25px 0 10px',
};

const address = {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#666666',
    backgroundColor: '#f8f8f8',
    padding: '15px',
    borderRadius: '5px',
    margin: '0 0 20px',
    whiteSpace: 'pre-line' as const,
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