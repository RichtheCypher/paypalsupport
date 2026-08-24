export interface HelpTopic {
  id: string;
  title: string;
  category: 'payments' | 'account' | 'security' | 'disputes' | 'business';
  summary: string;
  views: number;
  popular?: boolean;
}

export interface Transaction {
  id: string;
  merchant: string;
  date: string;
  amount: number;
  currency: string;
  status: 'Completed' | 'Pending' | 'Disputed' | 'Refunded';
  category: string;
  avatar: string;
}

export interface DisputeCase {
  id: string;
  transactionId: string;
  merchant: string;
  amount: string;
  dateFiled: string;
  status: 'Under Review' | 'Awaiting Merchant Response' | 'Action Required' | 'Resolved';
  reason: string;
  estimatedResolution: string;
  steps: {
    title: string;
    completed: boolean;
    date?: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  actions?: { label: string; action: string }[];
}

export const POPULAR_HELP_TOPICS: HelpTopic[] = [
  {
    id: '1',
    title: 'How do I request a refund for a PayPal transaction?',
    category: 'payments',
    summary: 'Learn how to contact sellers directly, request a refund, or open a case in the Resolution Center if an item has not arrived.',
    views: 124500,
    popular: true
  },
  {
    id: '2',
    title: 'How do I open a dispute in the Resolution Center?',
    category: 'disputes',
    summary: 'Follow step-by-step instructions to report an unauthorized transaction, item not received, or significantly not as described.',
    views: 98300,
    popular: true
  },
  {
    id: '3',
    title: 'What should I do if my account is locked or limited?',
    category: 'account',
    summary: 'Identify the reasons for account limitations and find out what identity documents you need to upload to restore full functionality.',
    views: 87600,
    popular: true
  },
  {
    id: '4',
    title: 'How do I report an unrecognized or unauthorized charge?',
    category: 'security',
    summary: 'Act fast to secure your account, change your password, turn on 2FA, and file an unauthorized transaction claim.',
    views: 142100,
    popular: true
  },
  {
    id: '5',
    title: 'How long do PayPal refunds take to arrive on bank accounts?',
    category: 'payments',
    summary: 'Refund timelines depend on your original payment method (Credit card: 30 days, Debit card: 2-5 days, PayPal Balance: Instant).',
    views: 74200,
    popular: true
  },
  {
    id: '6',
    title: 'How to cancel a automatic subscription or recurring billing',
    category: 'payments',
    summary: 'Go to Settings > Payments > Automatic payments to manage or cancel active merchant agreements.',
    views: 65100,
    popular: false
  },
  {
    id: '7',
    title: 'Updating your phone number, email address, or home address',
    category: 'account',
    summary: 'Keep your contact details up-to-date to ensure 2FA verification codes arrive without delay.',
    views: 51200,
    popular: false
  },
  {
    id: '8',
    title: 'Seller Protection Policy & chargeback guidelines',
    category: 'business',
    summary: 'Understand proof of shipment requirements and eligible items for PayPal Seller Protection.',
    views: 43000,
    popular: false
  }
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'PP-9823145',
    merchant: 'TechGadgets Store',
    date: 'Aug 22, 2026',
    amount: 149.99,
    currency: 'USD',
    status: 'Completed',
    category: 'Electronics',
    avatar: '📱'
  },
  {
    id: 'PP-8834190',
    merchant: 'Global Stream Plus (Subscription)',
    date: 'Aug 19, 2026',
    amount: 18.99,
    currency: 'USD',
    status: 'Completed',
    category: 'Digital Goods',
    avatar: '🍿'
  },
  {
    id: 'PP-7721094',
    merchant: 'Unknown Retailer Inc.',
    date: 'Aug 15, 2026',
    amount: 299.00,
    currency: 'USD',
    status: 'Disputed',
    category: 'Clothing',
    avatar: '❓'
  },
  {
    id: 'PP-6612091',
    merchant: 'Urban Coffee Roasters',
    date: 'Aug 10, 2026',
    amount: 24.50,
    currency: 'USD',
    status: 'Completed',
    category: 'Food & Dining',
    avatar: '☕'
  },
  {
    id: 'PP-5591023',
    merchant: 'Airlines Direct Booking',
    date: 'Jul 28, 2026',
    amount: 450.00,
    currency: 'USD',
    status: 'Refunded',
    category: 'Travel',
    avatar: '✈️'
  }
];

export const MOCK_DISPUTES: DisputeCase[] = [
  {
    id: 'CASE-2026-8901',
    transactionId: 'PP-7721094',
    merchant: 'Unknown Retailer Inc.',
    amount: '$299.00 USD',
    dateFiled: 'Aug 16, 2026',
    status: 'Under Review',
    reason: 'Unauthorized Transaction',
    estimatedResolution: 'Aug 28, 2026',
    steps: [
      { title: 'Case Opened', completed: true, date: 'Aug 16, 2026' },
      { title: 'Merchant Notified', completed: true, date: 'Aug 16, 2026' },
      { title: 'PayPal Review in Progress', completed: false },
      { title: 'Final Resolution', completed: false }
    ]
  },
  {
    id: 'CASE-2026-4412',
    transactionId: 'PP-4412890',
    merchant: 'Luxury Apparel Outlet',
    amount: '$89.50 USD',
    dateFiled: 'Jul 30, 2026',
    status: 'Action Required',
    reason: 'Item Not Received',
    estimatedResolution: 'Aug 26, 2026',
    steps: [
      { title: 'Case Opened', completed: true, date: 'Jul 30, 2026' },
      { title: 'Merchant Responded', completed: true, date: 'Aug 02, 2026' },
      { title: 'Provide Shipping Clarification', completed: false, date: 'Pending your response' },
      { title: 'Final Resolution', completed: false }
    ]
  }
];
