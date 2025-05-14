import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { PokemonSearcher } from "../src/components/PokemonSearcher";
import userEvent from "@testing-library/user-event";


describe("PokemonSearcher component tests", () => {

	test("PokemonSearcher renders", () => {

		const result = render(<PokemonSearcher />)
		// const pokemonSearchNameInputElement = screen.getByText("Pokemon to search for:");
		// const pokemonSearchNameInputElement = result.container.querySelector("#pokemonNameInput");

		const pokemonSearchNameInputElement = screen.getByTestId("pokemonNameInput")

		expect(pokemonSearchNameInputElement).toBeTruthy();
		expect(pokemonSearchNameInputElement).toBeInTheDocument();
	});

	test.skip("PokemonSearcher makes a random number", () => {

		// render(<PokemonSearcher />)

	});


	test("Can type in Pokemon name and search for that provided name", async () => {

		const result = render(<PokemonSearcher />);

		// Find the text input field for the pokemon name
		const pokemonSearchNameInputElement = screen.getByTestId("pokemonNameInput");
		expect(pokemonSearchNameInputElement).toBeInTheDocument();

		const user = userEvent.setup();

		// await user.click(pokemonSearchNameInputElement);
		// await user.keyboard(pokemonSearchNameInputElement,"pikachu");

		await user.type(pokemonSearchNameInputElement,"pikachu");

		// expect(pokemonSearchNameInputElement.innerText).toBe("pikachu");
		
		waitFor(() => {
			expect(pokemonSearchNameInputElement.value).toBe("pikachu");
		});

		// Find the button to submit the pokemon name to the API 

		// Find the content rendered to the page to reflect the API result 

	});



});