const calculateBalances = (expenses, members) => {
    const balances = {};

    members.forEach((member) => {
        balances[member.user.toString()] = 0;
    });


    expenses.forEach((expense) => {
        const { amount, payer, shares, splitType } = expense;
        const payerId = payer.toString();


        if (balances[payerId] !== undefined) {
            balances[payerId] += parseFloat(amount);
        }

        if (splitType === "unequal" || splitType === "shares") {
            // Custom split
            shares.forEach((share) => {
                const memberId = share.user.toString();
                if (balances[memberId] !== undefined) {
                    balances[memberId] -= parseFloat(share.amount);
                }
            });
        } else {

            const shareAmount = parseFloat(amount) / shares.length;
            shares.forEach((share) => {
                const memberId = share.user.toString();
                if (balances[memberId] !== undefined) {
                    balances[memberId] -= shareAmount;
                }
            });
        }
    });

    return balances;
};

const calculateSettlements = (balances) => {
    const settlements = [];


    const debtors = [];
    const creditors = [];

    Object.entries(balances).forEach(([memberId, balance]) => {
        if (balance < -0.01) {
            debtors.push({ memberId, amount: Math.abs(balance) });
        } else if (balance > 0.01) {
            creditors.push({ memberId, amount: balance });
        }
    });

    debtors.sort((a, b) => b.amount - a.amount);
    creditors.sort((a, b) => b.amount - a.amount);

    let i = 0,
        j = 0;

    while (i < debtors.length && j < creditors.length) {
        const debtor = debtors[i];
        const creditor = creditors[j];

        const transferAmount = Math.min(debtor.amount, creditor.amount);

        if (transferAmount > 0.01) {
            settlements.push({
                from: debtor.memberId,
                to: creditor.memberId,
                amount: Math.round(transferAmount * 100) / 100,
            });
        }

        debtor.amount -= transferAmount;
        creditor.amount -= transferAmount;

        if (debtor.amount < 0.01) i++;
        if (creditor.amount < 0.01) j++;
    }

    return settlements;
};

module.exports = { calculateBalances, calculateSettlements };
