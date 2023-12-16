import { Card, Row } from 'antd';
import './cards.css';
import Button from '../button/Button';

const Cards = ({ showExpenseModal, showIncomeModal, totalBalance, totalIncome, totalExpense }) => {
    
    return (
        <div>
            <Row className='my-cards-row'>
                <Card bordered={true} className='my-card'>
                    <h2>Current Balance</h2>
                    <p>${totalBalance}</p>
                    <Button text="Reset Balance" blue={true} />
                </Card>

                <Card bordered={true} className='my-card'>
                    <h2>Total Income</h2>
                    <p>${totalIncome}</p>
                    <Button text="Add Income" blue={true} onClick={showIncomeModal} />
                </Card>

                <Card bordered={true} className='my-card' >
                    <h2>Total Expenses</h2>
                    <p>${totalExpense}</p>
                    <Button text="Add Expense" blue={true} onClick={showExpenseModal} />
                </Card>
            </Row>
        </div>
    )
}

export default Cards