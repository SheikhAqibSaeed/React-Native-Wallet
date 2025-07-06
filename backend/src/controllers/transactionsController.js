import { sql } from "../config/db.js";

export async function getTransactionByUserId(req , res) {
        
           try {
            const { userId } = req.params;
               const transactions = await sql`
                   SELECT * FROM transactions
                   WHERE user_id = ${userId}
                   ORDER BY created_at DESC;
               `;
               console.log('Transactions fetched successfully:', userId);
               res.status(200).json(transactions);   
           } catch (error) {
               console.error('Error fetching transactions:', error);
               res.status(500).json({ error: 'Failed to fetch transactions' });
           }
    
}

export async function createTransaction(req, res) {

    try {
        const { user_id, title, amount, category } = req.body;
        if(!user_id || !title || !amount === undefined || !category) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const transactions = await sql`
            INSERT INTO transactions(user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *;
        `;
        console.log('Transaction created successfully:', transactions);
        res.status(201).json(transactions[0]);
    } catch (error) {
        console.error('Error inserting transaction:', error);
        res.status(500).json({ error: 'Failed to create transaction' });
    }
}

export async function deleteTransaction(req, res) {
    try {
        const { id } = req.params;
        if(isNaN(id)) {
            return res.status(400).json({ error: 'Invalid transaction ID' });
        }
        const result = await sql`
            DELETE FROM transactions
            WHERE id = ${id}
            RETURNING *;
        `;
        if (result.length === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }
        console.log('Transaction deleted successfully:', id);
        res.status(200).json({ message: 'Transaction deleted successfully', transaction: result[0] });
    } catch (error) {
        console.error('Error deleting transaction:', error);
        res.status(500).json({ error: 'Failed to delete transaction' });
    }
}

export async function getTransactionSummary (req, res) {
    try {
        const { userId } = req.params;
        const balanceResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS balance
            FROM transactions
            WHERE user_id = ${userId};
        `
        const incomeResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS income
            FROM transactions
            WHERE user_id = ${userId} AND amount > 0;
        `
        const expenseResult = await sql`
            SELECT COALESCE(SUM(amount), 0) AS expense
            FROM transactions
            WHERE user_id = ${userId} AND amount < 0;
        `
        res.status(200).json({
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expense: expenseResult[0].expense
        });
        
        console.log('Transaction summary fetched successfully:', {
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expense: expenseResult[0].expense
        });
    } catch (error) {
        console.error('Error fetching transaction summary:', error);
        res.status(500).json({ error: 'Failed to fetch transaction summary' });
    }
}