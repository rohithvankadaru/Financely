import Header from '../components/header/Header';
import Cards from '../components/cards/Cards';
import { useContext, useEffect, useState } from 'react';
import AddIncome from '../components/modals/addIncome';
import AddExpense from '../components/modals/addExpense';
import moment from 'moment/moment';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import authenticationContext from '../context/authenticationContext';
import TransactionsTable from '../components/transactionsTable/TransactionsTable';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(authenticationContext);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login');
  //   }
  // }, [user])

  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const [totalBalance, setTotalBalance] = useState(10);
  const [totalIncome, setTotalIncome] = useState(10);
  const [totalExpense, setTotalExpense] = useState(10);

  function showExpenseModal() {
    setIsExpenseModalVisible(true);
  }
  function showIncomeModal() {
    setIsIncomeModalVisible(true);
  }

  function handleExpenseCancle() {
    setIsExpenseModalVisible(false);
  }
  function handleIncomeCancle() {
    setIsIncomeModalVisible(false);
  }

  function onFinish(values, type) {
    const newTransaction = {
      type,
      date: moment(values.date.$d).format('YYYY-MM-DD'),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name
    }
    addTransaction(newTransaction);
  }

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      )
      setTransactions([...transactions, transaction]);
      toast.success('Transaction added successfully!');
    }
    catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions])

  function calculateBalance() {
    let incomeTotal = 0;
    let expenseTotal = 0;

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        incomeTotal += transaction.amount;
      }
      else {
        expenseTotal += transaction.amount;
      }
    })

    setTotalIncome(incomeTotal);
    setTotalExpense(expenseTotal);
    setTotalBalance(incomeTotal - expenseTotal);
  }

  async function fetchTransactions() {
    if (user) {
      setLoading(true);
      try {
        const q = query(collection(db, `users/${user.uid}/transactions`));
        const querySnapshot = await getDocs(q);
        const transactionsArray = [];
        querySnapshot.forEach(doc => {
          transactionsArray.push(doc.data());
        });
        setTransactions(transactionsArray);
        toast.success('Transactions Fetched!');
        setLoading(false);
      }
      catch (error) {
        toast.error(error.code);
        setLoading(false);
      }
    }
  }

  return (
    <div>
      {loading ? <p>Loading...</p> :
        <>
          <Header />
          <Cards totalBalance={totalBalance} totalIncome={totalIncome} totalExpense={totalExpense} showExpenseModal={showExpenseModal} showIncomeModal={showIncomeModal} />

          <AddIncome isIncomeModalVisible={isIncomeModalVisible} handleIncomeCancle={handleIncomeCancle} onFinish={onFinish} />
          <AddExpense isExpenseModalVisible={isExpenseModalVisible} handleExpenseCancle={handleExpenseCancle} onFinish={onFinish} />
          <TransactionsTable transactions={transactions} />
        </>
      }
    </div>
  )
}

export default Dashboard;