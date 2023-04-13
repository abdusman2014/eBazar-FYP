interface Card{
    cardNo: number,
    ownername: string,
    balance: number,
    transactionHistory: {
        title: string,
        image: string | null,
        amount: number,
        isTopUp: boolean,
        date: Date,
    }[]
}

export default Card;