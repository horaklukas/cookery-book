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
});
