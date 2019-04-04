import React, { Component } from 'react';
import Producer from './components/Work/Producer';
import Multiplicator from './components/Multiplactor/Multiplicator';
import { Row, Col } from 'react-bootstrap';
import helpers from './helpers';
import './App.css';

interface producer {
  key: number,
  name: string,
  price: number,
  multiplicator_price: number,
  prod: number,
  base_prod: number,
  count: number,
}

interface IState {
  neuron_count: number;
  neuron_prod: number;
  producers: [producer, producer, producer, producer, producer, producer], 
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
      { key: 0, name: 'Working', price: 2, multiplicator_price: 4, prod: 1, base_prod: 1, count: 0 },
      { key: 1, name: 'Reading a book', price: 41, multiplicator_price: 125, prod: 16, base_prod: 16, count: 0 },
      { key: 2, name: 'Reading the documentation', price: 101, multiplicator_price: 255, prod: 64, base_prod: 64, count: 0 },
      { key: 3, name: 'Test and retry', price: 1024, multiplicator_price: 1500, prod: 256, base_prod: 256, count: 0 },
      { key: 4, name: 'Copy/pasting from Github', price: 10338, multiplicator_price: 26000, prod: 1337, base_prod: 1337, count: 0 },
      { key: 5, name: 'Stealing someone\'s code and pretending it\'s yours', price: 420101, multiplicator_price: 1000000, prod: 37197, base_prod: 37197, count: 0 },
    ],
  };

  private compute_production() {
    const { producers } = this.state;
    let total_production = 0;
    producers.forEach(producer => {
      total_production += producer.prod * producer.count;
    });
    this.setState(state => ({
      neuron_prod: total_production,
    }));
  }

  private add_neuron() {
    this.setState(state => ({
      neuron_count: state.neuron_count + 1,
    }))
  };

  private async add_work(id: number) {
    const { producers, neuron_count } = this.state;
    await this.setState(state => ({
      neuron_count: neuron_count - producers[id].price,
    }))
    producers[id].count += 1;
    producers[id].price = Math.ceil(producers[id].price * 1.3);
    this.compute_production();
  }

  private async add_multiplicator(id: number) {
    const { producers, neuron_count } = this.state;
    await this.setState(state => ({
      neuron_count: state.neuron_count - producers[id].multiplicator_price,
    }));
    producers[id].prod += producers[id].base_prod;
    producers[id].multiplicator_price = Math.ceil(producers[id].multiplicator_price * 2.3);
    this.compute_production(); 
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
      <Producer key={p.key} id={p.key} name={p.name} price={p.price} prod={p.prod} count={p.count} neuron_count={neuron_count} add_work={this.add_work.bind(this)} />
    )
    const multiplicators_list = this.state.producers.map((p) =>
      <Multiplicator key={p.key} id={p.key} name={p.name} price={p.multiplicator_price} neuron_count={neuron_count} add_multiplicator={this.add_multiplicator.bind(this)} />
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
