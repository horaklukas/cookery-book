'use strict';

describe('CookeryBook', function() {
  let React = require('react');
  let {Map, List, fromJS} = require('immutable');
  let TestUtils = require('react-shallow-testutils');
  let renderer = new TestUtils.Renderer();
  let rewire = require('rewire');
  var CookeryBook, BookCover, Page, Recipe, BrowseButton;

  beforeAll(function() {
    this.mockActions = {
      setFirstPage: jasmine.createSpy(), setLastPage: jasmine.createSpy(),
      setPreviousPage: jasmine.createSpy(), setNextPage: jasmine.createSpy()
    };

    CookeryBook = rewire('components/CookeryBook.js');
    CookeryBook.__set__('CookeryBookActions', this.mockActions);

    BookCover = require('components/BookCover');
    Page = require('components/Page');
    Recipe = require('components/Recipe');
    BrowseButton = require('components/BrowseButton');
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

    this.component = renderer.render(() => <CookeryBook {...props} />, props);
  });

  it('should create a book cover when recipe id is not defined', function() {
    let props = {book: Map({actualRecipe: null}), recipes: this.recipes};
    let component = renderer.render(() => <CookeryBook {...props} />, props);

    TestUtils.findWithType(component, BookCover);
    expect(TestUtils.findAllWithType(component, Page).length).toEqual(0);
  });

  it('should create just forward buttons when recipe id is not defined', function() {
    let props = {book: Map({actualRecipe: null}), recipes: this.recipes};
    let component = renderer.render(() => <CookeryBook {...props} />, props);

    let browseButtons = TestUtils.findAllWithType(component, BrowseButton);
    expect(browseButtons.length).toEqual(2);
    expect(browseButtons[0].props.type).toEqual('forward');
    expect(browseButtons[1].props.type).toEqual('fast-forward');
  });

  it('should create both browse buttons when show recipe in middle of book', function() {
    let browseButtons = TestUtils.findAllWithType(this.component, BrowseButton);
    expect(browseButtons.length).toEqual(4);
    expect(browseButtons[0].props.type).toEqual('fast-backward');
    expect(browseButtons[1].props.type).toEqual('backward');
    expect(browseButtons[2].props.type).toEqual('forward');
    expect(browseButtons[3].props.type).toEqual('fast-forward');
  });

  it('should create no button when there are no recipes', function() {
    let props = {book: Map({actualRecipe: null}), recipes: List([])};
    let component = renderer.render(() => <CookeryBook {...props} />, props);

    let browseButtons = TestUtils.findAllWithType(component, BrowseButton);
    expect(browseButtons.length).toEqual(0);
  });

  it('should create just backward buttons when recipe id is id of last', function() {
    let props = {book: Map({actualRecipe: 'r4'}), recipes: this.recipes};
    let component = renderer.render(() => <CookeryBook {...props} />, props);

    let browseButtons = TestUtils.findAllWithType(component, BrowseButton);
    expect(browseButtons.length).toEqual(2);
    expect(browseButtons[0].props.type).toEqual('fast-backward');
    expect(browseButtons[1].props.type).toEqual('backward');
  });

  it('should call appropriete action when clicked button', function() {
    let browseButtons = TestUtils.findAllWithType(this.component, BrowseButton);

    browseButtons[0].props.onClick();
    expect(this.mockActions.setFirstPage.calls.count(), 'fast-backward').toEqual(1);

    browseButtons[1].props.onClick();
    expect(this.mockActions.setPreviousPage.calls.count(), 'backward').toEqual(1);

    browseButtons[2].props.onClick();
    expect(this.mockActions.setNextPage.calls.count(), 'forward').toEqual(1);

    browseButtons[3].props.onClick();
    expect(this.mockActions.setLastPage.calls.count(), 'fast-forward').toEqual(1);
  });

  it('should create page with recipe when recipe id is  defined', function() {
    let page = TestUtils.findWithType(this.component, Page);
    let recipe = TestUtils.findWithType(page, Recipe);
    expect(recipe.props.recipe).toEqual(this.recipes.get(1));

    expect(TestUtils.findAllWithType(this.component, BookCover).length).toEqual(0);
  });
});
