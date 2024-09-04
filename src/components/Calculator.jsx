import React, { useState } from "react";
import { Dropdown, Form, Button, Row, Col } from "react-bootstrap";

const Calculator = () => {
    const [input, setInput] = useState("");
    const [result, setResult] = useState("");

    const handleClick = (value) => {
        setInput((prev) => prev + value);
    };

    const handleClear = () => {
        setInput("");
        setResult("");
    };

    const handleCalculate = () => {
        try {
            setResult(eval(input)); // Note: eval should be used cautiously
        } catch (error) {
            setResult("Error");
        }
    };

    const baseButtonStyle = {
        width: '100%',
        height: '60px',
        fontSize: '20px',
        margin: '5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        backgroundColor: '#f0f0f0',
        color: '#333',
        cursor: 'pointer',
        transition: 'background-color 0.3s, color 0.3s',
    };

    const hoverButtonStyle = {
        backgroundColor: '#d0d0d0',
        color: '#000',
    };

    const resultStyle = {
        fontSize: '24px',
        textAlign: 'right',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        marginBottom: '10px',
        backgroundColor: '#f9f9f9',
    };

    return (
        <Dropdown>
            <Dropdown.Toggle
                variant="success"
                id="dropdown-basic"
                className="calculator-button"
                style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}
            >
                Calculator
            </Dropdown.Toggle>

            <Dropdown.Menu className="p-3" style={{ minWidth: '300px' }}>
                <Form>
                    <Form.Control
                        as="textarea"
                        value={input}
                        readOnly
                        rows={2}
                        className="mb-2"
                        placeholder="Enter calculation"
                        style={resultStyle}
                    />
                    <Form.Control
                        as="textarea"
                        value={result}
                        readOnly
                        rows={2}
                        className="mb-3"
                        placeholder="Result"
                        style={resultStyle}
                    />
                    <Row>
                        {["1", "2", "3", "+"].map((char, index) => (
                            <Col key={index}>
                                <Button
                                    onClick={() => handleClick(char)}
                                    style={baseButtonStyle}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = hoverButtonStyle.backgroundColor}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = baseButtonStyle.backgroundColor}
                                >
                                    {char}
                                </Button>
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        {["4", "5", "6", "-"].map((char, index) => (
                            <Col key={index}>
                                <Button
                                    onClick={() => handleClick(char)}
                                    style={baseButtonStyle}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = hoverButtonStyle.backgroundColor}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = baseButtonStyle.backgroundColor}
                                >
                                    {char}
                                </Button>
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        {["7", "8", "9", "*"].map((char, index) => (
                            <Col key={index}>
                                <Button
                                    onClick={() => handleClick(char)}
                                    style={baseButtonStyle}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = hoverButtonStyle.backgroundColor}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = baseButtonStyle.backgroundColor}
                                >
                                    {char}
                                </Button>
                            </Col>
                        ))}
                    </Row>
                    <Row>
                        <Col>
                            <Button
                                onClick={() => handleClick("0")}
                                style={baseButtonStyle}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = hoverButtonStyle.backgroundColor}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = baseButtonStyle.backgroundColor}
                            >
                                0
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                onClick={() => handleClick(".")}
                                style={baseButtonStyle}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = hoverButtonStyle.backgroundColor}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = baseButtonStyle.backgroundColor}
                            >
                                .
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                onClick={handleClear}
                                style={{ ...baseButtonStyle, backgroundColor: '#ff6b6b', color: '#fff' }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = '#e74c3c';
                                    e.currentTarget.style.color = '#fff';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = '#ff6b6b';
                                    e.currentTarget.style.color = '#fff';
                                }}
                            >
                                C
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                onClick={handleCalculate}
                                style={{ ...baseButtonStyle, backgroundColor: '#4caf50', color: '#fff' }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = '#388e3c';
                                    e.currentTarget.style.color = '#fff';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = '#4caf50';
                                    e.currentTarget.style.color = '#fff';
                                }}
                            >
                                =
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default Calculator;
