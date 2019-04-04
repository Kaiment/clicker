import React, { Component } from 'react';
import Producer from './components/Work/Producer';
import Multiplicator from './components/Multiplactor/Multiplicator';
import { Row, Col } from 'react-bootstrap';
import helpers from './helpers';
import './App.css';

interface producer {
  key: number,
  name: string,
  work_count: number,
  prod_value: number,
  prod: number,
  price: number,
  mult_count: number,
  mult_price: number,
}

interface IState {
  neuron_count: number;
  neuron_prod: number;
  producers: [producer, producer, producer, producer, producer, producer, producer], 
}

class App extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.add_neuron = this.add_neuron.bind(this);
  };

  public readonly state: Readonly<IState> = {
    neuron_count: 0,
    neuron_prod: 0,
    producers: [
      { key: 0, name: 'Work', work_count: 0, prod_value: 0, prod: 1, price: 2, mult_count: 1, mult_price: 10 },
      { key: 1, name: 'Book', work_count: 0, prod_value: 0, prod: 16, price: 42, mult_count: 1, mult_price: 1000 },
      { key: 2, name: 'Youtube video', work_count: 0, prod_value: 0, prod: 32, price: 101, mult_count: 1, mult_price: 10000 },
      { key: 3, name: 'Github and Stack Overflow', work_count: 0, prod_value: 0, prod: 375, price: 4004, mult_count: 1, mult_price: 100000 },
      { key: 4, name: 'Attend to a Flat earther conference', work_count: 0, prod_value: 0, prod: 3600, price: 84000, mult_count: 1, mult_price: 10000000 },
      { key: 5, name: 'Using Google', work_count: 0, prod_value: 0, prod: 400413, price: 1040404, mult_count: 1, mult_price: 1000000000 },
      { key: 6, name: 'Cerebral chip', work_count: 0, prod_value: 0, prod: 5120000, price: 36021666, mult_count: 1, mult_price: 999999999 },
    ]
  };

  private calc_prod() {
    let total_prod = 0;
    this.state.producers.forEach(producer => {
      total_prod += producer.prod_value * producer.mult_count;
    });
    return total_prod;
  }

  private add_neuron() {
    this.setState(state => ({
      neuron_count: state.neuron_count + 1,
    }))
  };

  private add_work(id: number, price: number, prod: number) {
    this.state.producers.map(p => p.key === id ? p.work_count += 1 : p.work_count);
    this.state.producers.map(p => p.key === id ? p.prod_value += p.prod : p.prod_value);
    this.setState(state => ({
      neuron_count: state.neuron_count - price,
      neuron_prod: this.calc_prod(),
    }))
  }

  private add_multiplicator(id: number, price: number) {
    this.setState(state => ({
      neuron_count: state.neuron_count - price,
      neuron_prod: this.calc_prod(),
    }))
    this.state.producers.map(p => p.key === id ? p.mult_count += 1 : p.mult_count)
    this.state.producers.map(p => p.key === id ? p.prod *= p.mult_count : p.prod)
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(state => ({
        neuron_count: state.neuron_count + this.state.neuron_prod,
      }))
    }, 1000);
  }

  render() {
    const { neuron_count, neuron_prod } = this.state;
    const producers_list = this.state.producers.map((p) =>
      <Producer key={ p.key } id={ p.key } name={ p.name } neuron_count={ neuron_count } work_count={ p.work_count } add_work={ this.add_work.bind(this) } prod={p.prod} price={p.price} />
    )
    const multiplicators_list = this.state.producers.map((p) =>
      <Multiplicator key={ p.key } id={ p.key } name={ p.name } neuron_count={ neuron_count } mult_count={ p.mult_count } add_multiplicator={ this.add_multiplicator.bind(this) } price={ p.mult_price } />
    )

    return (
      <div className="App">
        <div>
          <Row>
            <Col md={5}>
              <div className='noselect'>{ helpers.numberWithCommas(neuron_count) } neurons</div>
              <div className='noselect'>{ helpers.numberWithCommas(neuron_prod) } per second</div>
              <h1 onClick={ this.add_neuron } className='brain noselect'>BRAIN</h1>
            </Col>
            <Col md={5}>
              {producers_list}
            </Col>
            <Col md={2}>
              { multiplicators_list }
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default App;
