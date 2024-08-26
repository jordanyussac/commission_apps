const calculateCommission = (omzet) => {
    if (omzet <= 100000000) {
        return { percentage: 0, commission: 0 };
    } else if (omzet <= 200000000) {
        return { percentage: 2.5, commission: omzet * 0.025 };
    } else if (omzet <= 500000000) {
        return { percentage: 5, commission: omzet * 0.05 };
    } else {
        return { percentage: 10, commission: omzet * 0.1 };
    }
};

export default calculateCommission;