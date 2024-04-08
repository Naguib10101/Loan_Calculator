let projectName = 'Loan Calculator';
document.title = projectName;
let titleProject = document.querySelector('h1');
let foot = document.querySelector('footer');
titleProject.innerHTML = projectName;
foot.innerHTML = `${projectName} Design By Ahmed Naguib`;

let loanAmount = document.querySelector('.Amount');
let interest = document.querySelector('.interest');
let monthlySalary = document.querySelector('.monthlySalary');
let yearsToPay = document.querySelector('.yearsToPay');
let btn = document.querySelector('.btn');
let alertWindow = document.querySelector('.warning-window');
let resultList = document.querySelector('.result_list');

let loanCalc , interCalc , monthlyCalc , yearsCalc;

loanAmount.addEventListener("keydown", (e)=> (!((e.keyCode >= 48 && e.keyCode <= 57) || e.key === 'Backspace')) ? e.preventDefault() : null);
interest.addEventListener("keydown", (e)=> (!((e.keyCode >= 48 && e.keyCode <= 57) || e.key === 'Backspace')) ? e.preventDefault() : null);
monthlySalary.addEventListener("keydown", (e)=> (!((e.keyCode >= 48 && e.keyCode <= 57) || e.key === 'Backspace')) ? e.preventDefault() : null);
yearsToPay.addEventListener("keydown", (e)=> (!((e.keyCode >= 48 && e.keyCode <= 57) || e.key === 'Backspace')) ? e.preventDefault() : null);

(localStorage.getItem('LoanAmount')) ? loanAmount.value = JSON.parse(localStorage.getItem('LoanAmount')) : null;
(localStorage.getItem('interest')) ? interest.value = JSON.parse(localStorage.getItem('interest')) : null;
(localStorage.getItem('monthlySalary')) ? monthlySalary.value = JSON.parse(localStorage.getItem('monthlySalary')) : null;
(localStorage.getItem('yearsToPay')) ? yearsToPay.value = JSON.parse(localStorage.getItem('yearsToPay')) : null;


let calculate = ()=>{
    if(loanAmount.value !== '') loanCalc = loanAmount.value;
    if(interest.value !== '') interCalc = interest.value / 100;
    if(monthlySalary.value !== '') monthlyCalc = monthlySalary.value;
    if(yearsToPay.value !== '') yearsCalc = yearsToPay.value;

    (loanAmount.value === '' || interest.value === '' || monthlySalary.value === '' || yearsToPay.value === '') ?
        alertWindow.style.display = 'block' : alertWindow.style.display = 'none';
    
        if(loanAmount.value !== '' && interest.value !== '' && monthlySalary.value !== '' && yearsToPay.value !== ''){
        
        localStorage.setItem('LoanAmount' , JSON.stringify(loanAmount.value))
        localStorage.setItem('interest' , JSON.stringify(interest.value))
        localStorage.setItem('monthlySalary' , JSON.stringify(monthlySalary.value))
        localStorage.setItem('yearsToPay' , JSON.stringify(yearsToPay.value))

        loanAmount.value = '';
        interest.value = '';
        monthlySalary.value = '';
        yearsToPay.value = '';
        resultList.innerHTML = '';

        let formula_interest = ((loanCalc * (interCalc / 12))) / (1 -  Math.pow(1 + (interCalc / 12)  , - 12 * yearsCalc));

        let calculate_Loan = document.createElement('div');
        calculate_Loan.classList.add('calculate-Loan');

        let title = document.createElement('h1');
        title.textContent = 'Results';

        let monthlyPayment = document.createElement('div');
        monthlyPayment.classList.add('result-information');
        monthlyPayment.textContent = formula_interest.toFixed(3);
        let details_monthly = document.createElement('span');
        details_monthly.textContent = 'monthly Payment';
        monthlyPayment.appendChild(details_monthly);

        let TotalPayment = document.createElement('div');
        TotalPayment.classList.add('result-information');
        TotalPayment.textContent = ((formula_interest * 12 * yearsCalc).toFixed(3));
        let totalPayment_details = document.createElement('span');
        totalPayment_details.textContent = 'Total Payment';
        TotalPayment.appendChild(totalPayment_details);

        let Total_interest = document.createElement('div');
        Total_interest.classList.add('result-information');
        Total_interest.textContent = (((formula_interest * 12 * yearsCalc)- loanCalc).toFixed(3));
        let Total_interest_details = document.createElement('span');
        Total_interest_details.textContent = 'Total Interest';
        Total_interest.appendChild(Total_interest_details);

        calculate_Loan.appendChild(title);
        calculate_Loan.appendChild(monthlyPayment);
        calculate_Loan.appendChild(TotalPayment);
        calculate_Loan.appendChild(Total_interest);

        resultList.appendChild(calculate_Loan);

    }
}

btn.addEventListener('click' , calculate);