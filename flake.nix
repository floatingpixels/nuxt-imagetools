{
  description = "Development environment for Nuxt.js project with Node.js and TypeScript";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        # pkgs = nixpkgs.legacyPackages.${system};
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            nodejs_22 # Node.js
            nodePackages.pnpm # PNPM package manager
            nodePackages."@antfu/ni"
            typescript
          ];
        };
      }
    );
}
