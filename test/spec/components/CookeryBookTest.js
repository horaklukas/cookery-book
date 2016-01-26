'use strict';

describe('CookeryBook', function() {
  let React = require('react');
  let Immutable = require('immutable');
  let TestUtils = require('react-shallow-testutils');
  let renderer = new TestUtils.Renderer();
  var CookeryBook, BookCover, Page, Recipe;

  beforeAll(function() {
    CookeryBook = require('components/CookeryBook.js');
    BookCover = require('components/BookCover');
    Page = require('components/Page');
    Recipe = require('components/Recipe');
  });

  beforeEach(function() {
    this.recipes = Immutable.fromJS([
      {id: 'r1', title: 'recipe1'}, {id: 'r2',  title: 'recipe2'}
    ]);
    this.book = Immutable.Map({actualRecipe: 'r2'});
    let props = {book: this.book, recipes: this.recipes};

    this.component = renderer.render(() => <CookeryBook {...props} />, props);
  });

  it('should create a book cover when recipe id is not defined', function() {
    let props = {book: Immutable.Map({actualRecipe: null}), recipes: this.recipes};
    let component = renderer.render(() => <CookeryBook {...props} />, props);

    TestUtils.findWithType(component, BookCover);
    expect(TestUtils.findAllWithType(component, Page).length).toEqual(0);
  });

  it('should create page with recipe when recipe id is  defined', function() {
    let page = TestUtils.findWithType(this.component, Page);
    let recipe = TestUtils.findWithType(page, Recipe);
    expect(recipe.props.recipe).toEqual(this.recipes.get(1));

    expect(TestUtils.findAllWithType(this.component, BookCover).length).toEqual(0);
  });
});
