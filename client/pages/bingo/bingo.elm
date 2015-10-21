module Bingo where
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import String exposing (toUpper, repeat, trimRight)
import StartApp.Simple as StartApp
import Signal exposing (Address)
import BingoUtils as Utils
import BingoModel
--import Debug


-- UPDATE

type Action = NoOp 
            | Sort 
            | Delete Int 
            | Mark Int 
            | UpdatePhraseInput String 
            | UpdatePointsInput String
            | Add

update : Action -> BingoModel.Model -> BingoModel.Model
update action model =
  case action of
    NoOp -> model
    Sort -> { model | entries <- List.sortBy .points model.entries }
    Delete id ->
      let
        remainingEntries =
          List.filter (\e -> e.id /= id) model.entries
        --_ = Debug.log "the remaining entries" remainingEntries
      in
        { model | entries <- remainingEntries }

    Mark id ->
      let 
        updateEntry e =
          if e.id == id then {
            e | wasSpoken <- (not e.wasSpoken)
          } else e
      in { 
          model | entries <- List.map updateEntry model.entries 
        }

    UpdatePhraseInput contents -> {
        model | phraseInput <- contents
      }

    UpdatePointsInput contents -> {
        model | pointsInput <- contents
      }

    Add ->
      let
        entryToAdd =
           BingoModel.newEntry model.phraseInput (Utils.parseInt model.pointsInput) model.nextID
        
        isInvalid model = 
          String.isEmpty model.phraseInput || String.isEmpty model.pointsInput

      in 
        if isInvalid model
          then model
          else {
              model | phraseInput <- "",
                      pointsInput <- "",
                      entries <- entryToAdd :: model.entries,
                      nextID <- model.nextID + 1
            }

-- VIEW

title : String -> Int -> Html
title message times =
  message ++ " "
    |> toUpper 
    |> repeat times
    |> trimRight
    |> text

pageHeader : Html
pageHeader =
  h1 [ ] [ title "bingo!" 3 ]

pageFooter : Html
pageFooter =
  footer [ ]
    [ a [href "http://www.space-rocket.com" ] 
        [ text "Space Rocket | Web & Graphic Design" ] 
    ]

entryItem : Address Action -> BingoModel.Entry -> Html
entryItem address entry = 
  li [ 
    classList [ ("highlight", entry.wasSpoken)],
    onClick address (Mark entry.id)
  ] 
    [ i [ class "fa fa-camera-retro fa-lg"] [ ],
      span [ class "phrase"] [ text entry.phrase ],
      span [ class "points"] [ text (toString  entry.points) ],
      button
        [ class "delete", onClick address (Delete entry.id) ]
        [ ]
    ]

totalPoints : List BingoModel.Entry -> Int
totalPoints entries =
  let
    spokenEntries = List.filter .wasSpoken entries
  in
    List.sum (List.map .points spokenEntries)

totalItem : Int -> Html
totalItem total = 
  li [
      class "total"
      ][
        span [ class "label" ] [ text "total" ],
        span [ class "points" ] [ text (toString total) ]
      ]

entryList : Address Action -> List BingoModel.Entry -> Html
entryList address entries =
  let
    entryItems = List.map (entryItem address) entries
    items = entryItems ++ [ totalItem (totalPoints entries) ]
  in
    ul [ ] items

entryForm : Address Action -> BingoModel.Model -> Html
entryForm address model =
  div [ ][
    input [
      type' "text",
      placeholder "Phrase",
      value model.phraseInput,
      name "phrase",
      autofocus True,
      Utils.onInput address UpdatePhraseInput
    ][ ],
    input [
      type' "number",
      placeholder "Points",
      value model.pointsInput,
      name "points",
      Utils.onInput address UpdatePointsInput
    ][ ],
    button [
      class "add", onClick address Add
    ][
      text "Add"
    ],
    h2 [ ] [
      text (model.phraseInput ++ " " ++ model.pointsInput )
    ]
  ]



view : Address Action -> BingoModel.Model -> Html
view address model =
  div [ 
    id "container" 
  ][ 
    pageHeader,
    entryForm address model,
    entryList address model.entries,
    button [ 
      class "sort",
      onClick address Sort
    ][ 
      text "Sort" 
    ],
    pageFooter 
  ]

-- WIRE IT ALL TOGETHER!

main : Signal Html
main = 
  StartApp.start {
    model = BingoModel.initialModel,
    view = view,
    update = update
  }
