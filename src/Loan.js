import React, { useState } from 'react'
import { FaCalculator } from "react-icons/fa";

export default function Loan() {
  const [amount, setAmount] = useState('');
  const [year, setyear] = useState('');
  const [month, setmonth] = useState('');
  const [totalAmount, setTotalAmount] = useState('0');
  const [totalIntAmount, setTotalIntAmount] = useState('0');
  const [noYears, setNoYears] = useState('');
  const [period, setPeriod] = useState('');
  const [intRate, setIntRate] = useState('');
  const [intPeriod, setIntPeriod] = useState('');
  const [startYear, setStartYear] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [monthly, setMonthly] = useState('0');
  const [loanMonth, setLoanMonth] = useState('0');
  const [annualRateInt, setAnnualRateInt] = useState('');
  const [yearIntAmount, setYearIntAmount] = useState('0');
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const monthlyInterestRate = parseFloat(intRate) / 12 / 100;
    const numberOfPayments = parseInt(noYears) * (period === 'year' ? 12 : 1);
    const x = Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const monthlyPayment = (amount * x * monthlyInterestRate) / (x - 1);
    const totalAmountWithInterest = monthlyPayment * numberOfPayments;
    const totalInterestAmount = totalAmountWithInterest - amount;
    let yearlyInterestAmount;
    if (period === 'year') {
      yearlyInterestAmount = totalInterestAmount / parseInt(noYears);
    } else {
      yearlyInterestAmount = (totalInterestAmount / numberOfPayments) * 12;
    }

    setAnnualRateInt(monthlyInterestRate);
    setLoanMonth(numberOfPayments);
    setMonthly((monthlyPayment).toFixed(2));
    setTotalAmount((totalAmountWithInterest).toFixed(2));
    setTotalIntAmount((totalInterestAmount).toFixed(2));
    setYearIntAmount((yearlyInterestAmount).toFixed(2));

    // Generate amortization schedule
    const amortizationSchedule = [];
    let balance = amount;

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = balance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      const endingBalance = balance - principalPayment;

      amortizationSchedule.push({
        month,
        startingBalance: parseFloat(balance).toFixed(2),
        interestPayment: interestPayment.toFixed(2),
        principalPayment: principalPayment.toFixed(2),
        emi: Number(monthlyPayment).toFixed(2),
        endingBalance: endingBalance.toFixed(2),
      });

      balance = endingBalance;
    }

    setAmortizationSchedule(amortizationSchedule);

  }
  return (
    <>
      <section className=''>
        <div className='mx-auto my-5 bg-slate-200 w-[40%]'>
          <form action="" onSubmit={(e) => handleSubmit(e)}>
            <table width={'100%'}>
              <tbody>
                <tr className='bg-slate-400'>
                  <th colSpan={2} width={'100%'}>
                    <div className='flex p-3 place-items-center'>
                    <span className='me-3 text-[20px]'><FaCalculator /></span>
                    <span className='text-[20px]'> Loan Amortization Calculator</span>
                    </div>
                  </th>
                </tr>
                <tr>
                  <td colSpan={2} width={'100%'}>
                    <p className='px-4 py-2 text-[18px]'>Loan Amount</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <input type="number" className='mx-4 p-3 border border-slate-700 rounded' name="" placeholder='Enter Loan Amount' width={'100%'} id="" value={amount} onChange={(e) => setAmount(e.target.value)} />
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <p className='px-4 py-2 text-[18px]'>Loan Tenure</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="number" className='mx-4 p-3 border border-slate-700 rounded' name="" placeholder='Enter No. of Years/Months' value={noYears} onChange={(e) => setNoYears(e.target.value)} width={'100%'} id="" />
                  </td>
                  <td>
                    <select name="" id="" className='mx-4 p-3 border border-slate-700 rounded' value={period} onChange={(e) => setPeriod(e.target.value)}>
                      <option value="" selected>--- select year/month ---</option>
                      <option value="year">In Year</option>
                      <option value="month">In Month</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className='px-4 py-2 text-[18px]'>Interest Rate (Reducing)</p>
                  </td>
                  <td>
                    <p className='px-4 py-2 text-[18px]'>Table View</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="number" name="" className='mx-4 p-3 border border-slate-700 rounded' placeholder='Enter Interest Rate' value={intRate} onChange={(e) => setIntRate(e.target.value)} width={'100%'} id="" />
                    <span>%</span>
                  </td>
                  <td>
                    <select name="" id="" className='mx-4 p-3 border border-slate-700 rounded' value={intPeriod} onChange={(e) => setIntPeriod(e.target.value)}>
                      <option value="" selected>---select---</option>
                      <option value="year">Yearly</option>
                      <option value="month">Monthly</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <p className='px-4 py-2 text-[18px]'>Starting Month & Year</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <select name="" id="" onChange={(e) => setyear(e.target.value)} className='mx-4 p-3 border border-slate-700 rounded'>
                      <option value="">---select year---</option>
                      <option value="2000">2000</option>
                      <option value="2001">2001</option>
                      <option value="2002">2002</option>
                      <option value="2003">2003</option>
                      <option value="2004">2004</option>
                      <option value="2005">2005</option>
                      <option value="2006">2006</option>
                      <option value="2007">2007</option>
                      <option value="2008">2008</option>
                      <option value="2009">2009</option>
                      <option value="2010">2010</option>
                      <option value="2011">2011</option>
                      <option value="2012">2012</option>
                      <option value="2013">2013</option>
                      <option value="2014">2014</option>
                      <option value="2015">2015</option>
                      <option value="2016">2016</option>
                      <option value="2017">2017</option>
                      <option value="2018">2018</option>
                      <option value="2019">2019</option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                    </select>
                  </td>
                  <td>
                    <select name="" id="" onChange={(e) => setmonth(e.target.value)} className='mx-4 p-3 border border-slate-700 rounded'>
                      <option value="">---select month---</option>
                      <option value="1">January</option>
                      <option value="2">Feb</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">Aug</option>
                      <option value="9">Sep</option>
                      <option value="10">Oct</option>
                      <option value="11">Nov</option>
                      <option value="12">Dec</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <input type="submit" className='button' value={'Submit'} />
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </section>

      <section>
        <div className=' table mx-auto my-5 w-[40%]'>
          <table width={'100%'}>
            <tbody>
              <tr>
                <td width={'50%'}>
                  <h3>Payment Duration :</h3>
                </td>
                <td>
                  {loanMonth}
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Calculated Monthly EMI :</h3>
                </td>
                <td>
                  {monthly}
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Total Amount with Interest :</h3>
                </td>
                <td>
                  {totalAmount}
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Total Interest Amount :</h3>
                </td>
                <td>
                  {totalIntAmount}
                </td>
              </tr>
              <tr>
                <td>
                  <h3>Yearly Interest Amount :</h3>
                </td>
                <td>
                  {yearIntAmount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className='my-5'>
        <div className=' table mx-auto my-5 w-[80%]'>
          <table width={'100%'}>
            <tr>
              <td>Month & Year</td>
              <td>Starting Balance</td>
              <td>Interest Paid</td>
              <td>Principle Paid</td>
              <td>EMI</td>
              <td>Ending Balance</td>
            </tr>
            {amortizationSchedule.map((row) => {
                let currentMonth = month;
                let currentYear = year;
              
                // Calculate the month and year for this row
                for (let i = 1; i < row.month; i++) {
                  currentMonth++;
                  if (currentMonth > 12) {
                    currentMonth = 1;
                    currentYear++;
                  }
                }
              return(
              <tr key={row.month}>
                <td>{monthNames[currentMonth - 1]}, {currentYear}</td>
                <td>{row.startingBalance}</td>
                <td>{row.interestPayment}</td>
                <td>{row.principalPayment}</td>
                <td>{row.emi}</td>
                <td>{row.endingBalance}</td>
              </tr>
              )
              })}
          </table>
        </div>
      </section>
    </>
  )
}
