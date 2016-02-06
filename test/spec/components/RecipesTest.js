'use strict';

describe('Recipes', function() {
  let React = require('react');
  let {Map, List, fromJS} = require('immutable');
  let TestUtils = require('react-shallow-testutils');
  let renderer = new TestUtils.Renderer();
  let rewire = require('rewire');
  var Recipes, Page, Recipe;

  beforeAll(function() {
    this.mockActions = {
      setFirstPage: jasmine.createSpy(), setLastPage: jasmine.createSpy(),
      setPreviousPage: jasmine.createSpy(), setNextPage: jasmine.createSpy()
    };

    Recipes = rewire('components/Recipes.js');
    Recipes.__set__('RecipesActions', this.mockActions);

    Page = require('components/Page');
    Recipe = require('components/Recipe');
  });

  beforeEach(function() {
    this.mockActions.setFirstPage.calls.reset();
    this.mockActions.setPreviousPage.calls.reset();
    this.mockActions.setNextPage.calls.reset();
    this.mockActions.setLastPage.calls.reset();

    this.recipes = fromJS([
      {id: 'r1', title: 'recipe1'}, {id: 'r2',  title: 'recipe2'},
      {id: 'r3',  title: 'recipe3'}, {id: 'r4',  title: 'recipe4'}
    ]);
    this.book = Map({actualRecipe: 'r2'});
    let props = {book: this.book, recipes: this.recipes};

    this.component = renderer.render(() => <Recipes {...props} />, props);
  });

  it('should create page for each recipe', function() {
    let pages = TestUtils.findAllWithType(this.component, Page);
    expect(pages.length).toEqual(this.recipes.size);
  });

  it('should set header for each page with recipe', function() {
    let pages = TestUtils.findAllWithType(this.component, Page);

    expect(pages[0].props.header).toEqual('1 / 4');    
    expect(pages[2].props.header).toEqual('3 / 4');
  });

  it('should set class `hidden` for each other than actual recipe', function() {
    let props = {book: this.book, recipes: this.recipes, height: 500};

    let component = renderer.render(() => <Recipes {...props} />, props);
    let pages = TestUtils.findAllWithType(component, Page);

    expect(pages[0].key).toEqual(this.recipes.getIn([0, 'id']));
    expect(pages[0].props.type, 'page 1').toEqual('hidden');
    expect(pages[1].key).toEqual(this.recipes.getIn([1, 'id']));
    expect(pages[1].props.type, 'page 2').toEqual('');
    expect(pages[2].key).toEqual(this.recipes.getIn([2, 'id']));
    expect(pages[2].props.type, 'page 3').toEqual('hidden');
    expect(pages[3].key).toEqual(this.recipes.getIn([3, 'id']));
    expect(pages[3].props.type, 'page 4').toEqual('hidden');
  });
});
