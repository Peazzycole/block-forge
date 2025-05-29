//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

import {Test} from "forge-std/Test.sol";
import {DeployTransactions} from "../script/DeployTransactions.s.sol";
import {Transactions} from "../src/Transactions.sol";

contract TransactionsTest is Test {
    Transactions transactions;

    event Transfer(
        address indexed sender,
        address indexed receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    function setUp() public {
        DeployTransactions deployer = new DeployTransactions();
        transactions = deployer.run();
    }

    function testInitialTransactionCountIsZero() public view {
        assertEq(transactions.getTransactionCount(), 0);
    }

    function testAddToBlockchainIncrementsCount() public {
        address payable receiver = payable(address(0xBEEF));
        uint256 amount = 1 ether;
        string memory message = "Test message";
        string memory keyword = "Test";

        transactions.addToBlockchain(receiver, amount, message, keyword);

        assertEq(transactions.getTransactionCount(), 1);
    }

    function testAddToBlockchainStoresTransaction() public {
        address payable receiver = payable(address(0xBEEF));
        uint256 amount = 1 ether;
        string memory message = "Test message";
        string memory keyword = "Test";

        transactions.addToBlockchain(receiver, amount, message, keyword);

        Transactions.Transaction[] memory txs = transactions.getAllTransactions();
        assertEq(txs.length, 1);
        assertEq(txs[0].sender, address(this));
        assertEq(txs[0].receiver, receiver);
        assertEq(txs[0].amount, amount);
        assertEq(txs[0].message, message);
        assertEq(txs[0].keyword, keyword);
    }

    function testAddToBlockchainEmitsTransferEvent() public {
        address payable receiver = payable(address(0xBEEF));
        uint256 amount = 1 ether;
        string memory message = "Test message";
        string memory keyword = "Test";

        vm.expectEmit(true, true, false, false);
        emit Transfer(address(this), receiver, amount, message, block.timestamp, keyword);

        transactions.addToBlockchain(receiver, amount, message, keyword);
    }
}
