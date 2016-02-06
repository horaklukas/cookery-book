'use strict';

describe('Page', function() {
  let React = require('react');
  let {Row} = require('react-bootstrap');
  let TestUtils = require('react-shallow-testutils');
  let renderer = new TestUtils.Renderer();
  var Page;

  beforeAll(function() {
    Page = require('components/Page.js');
  });

  it('should set class name same as prop type if supplied', function() {
    let props = {type: 'cover'};
    let component = renderer.render(() => <Page {...props} />, props);

    let row = TestUtils.findWithType(component, Row);
    expect(row.props.className).toEqual('page cover');
  });

  it('should set only `row` class when prop type no supplied', function() {
    let component = renderer.render(() => <Page />);

    let row = TestUtils.findWithType(component, Row);
    expect(row.props.className).toEqual('page');
  });

  it('should not create header if no content provided', function() {
    let component = renderer.render(() => <Page header={null} />);
    let header = TestUtils.findAllWithClass(component, 'header');

    expect(header.length).toEqual(0);    
  });

  it('should create header if empty text provided', function() {
    let component = renderer.render(() => <Page header={''} />);
    
    TestUtils.findWithClass(component, 'header');
  });

  it('should display supplied header content', function() {
    let component = renderer.render(() => <Page header="header content" />);
    let header = TestUtils.findWithClass(component, 'header');

    expect(header.props.children).toEqual('header content');    
  });
});
