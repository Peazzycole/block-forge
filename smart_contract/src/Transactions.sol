// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract Transactions {
    uint256 private s_transactionCount;

    event Transfer(
        address indexed sender,
        address indexed receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    struct Transaction {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    Transaction[] private s_transactions;

    function addToBlockchain(address payable receiver, uint256 amount, string memory message, string memory keyword)
        public
    {
        s_transactionCount++;
        s_transactions.push(Transaction(msg.sender, receiver, amount, message, block.timestamp, keyword));

        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }

    function getAllTransactions() public view returns (Transaction[] memory) {
        return s_transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return s_transactionCount;
    }
}
