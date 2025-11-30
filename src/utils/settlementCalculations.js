export const calculateBalances = (expenses, members) => {
    const balances = {};

    members.forEach(member => {
        balances[member.id] = 0;
    });

    expenses.forEach(expense => {
        const { amount, payer, sharedMembers, splits } = expense;

        if (balances[payer] !== undefined) {
            balances[payer] += parseFloat(amount);
        }

        if (splits && Object.keys(splits).length > 0) {
            Object.entries(splits).forEach(([memberId, splitAmount]) => {
                if (balances[memberId] !== undefined) {
                    balances[memberId] -= parseFloat(splitAmount);
                }
            });
        } else {
            const shareAmount = parseFloat(amount) / sharedMembers.length;
            sharedMembers.forEach(memberId => {
                if (balances[memberId] !== undefined) {
                    balances[memberId] -= shareAmount;
                }
            });
        }
    });

    return balances;
};


export const calculateSettlements = (balances, members) => {
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

    let i = 0, j = 0;

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
export const getMemberSummary = (expenses, memberId) => {
    let totalPaid = 0;
    let totalOwed = 0;

    expenses.forEach(expense => {
        const { amount, payer, sharedMembers, splits } = expense;

        if (payer === memberId) {
            totalPaid += parseFloat(amount);
        }
        if (splits && splits[memberId]) {
            totalOwed += parseFloat(splits[memberId]);
        } else if (!splits && sharedMembers.includes(memberId)) {
            totalOwed += parseFloat(amount) / sharedMembers.length;
        }
    });

    const netBalance = totalPaid - totalOwed;

    return {
        totalPaid: Math.round(totalPaid * 100) / 100,
        totalOwed: Math.round(totalOwed * 100) / 100,
        netBalance: Math.round(netBalance * 100) / 100,
    };
};
