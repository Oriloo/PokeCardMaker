document.addEventListener("DOMContentLoaded", function () {

    /**
     * Synchronise la valeur d'un input avec le contenu textuel d'un élément de sortie.
     * @param {string} inputId - L'id de l'input source.
     * @param {string} outputId - L'id de l'élément de sortie.
     */
    function syncInput(inputId, outputId) {
        const input = document.getElementById(inputId);
        const output = document.getElementById(outputId);
        if (input && output) {
            input.addEventListener("input", () => {
                output.textContent = input.value || "";
            });
            output.textContent = input.value || "";
        }
    }

    syncInput("name", "form-name");
    syncInput("hp", "form-hp");
    syncInput("hp-nb", "form-hp-nb");
    syncInput("info", "form-info");
    syncInput("weakness", "form-weakness");
    syncInput("weakness-value", "form-weakness-value");
    syncInput("resistance", "form-resistance");
    syncInput("resistance-value", "form-resistance-value");
    syncInput("retreat", "form-retreat");
    syncInput("illustrator", "form-illustrator");
    syncInput("numbering", "form-numbering");
    syncInput("description", "form-description");

    const typeSelect = document.getElementById("type");
    const typeDisplay = document.getElementById("form-type").querySelector("img");
    const rootStyle = document.documentElement.style;

    /**
     * Met à jour l'icône et la couleur associée au type principal.
     */
    function updateType() {
        if (!typeSelect || !typeDisplay) return;
        typeDisplay.src = `assets/energy/${typeSelect.value}.png`;
        typeDisplay.alt = typeSelect.value;
        rootStyle.setProperty("--color-card", `var(--${typeSelect.value}-rgb)`);
    }
    typeSelect.addEventListener("change", updateType);
    updateType();

    const imageInput = document.getElementById("image");
    const imageDisplay = document.getElementById("form-image").querySelector("img");
    if (imageInput && imageDisplay) {
        imageInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    imageDisplay.src = ev.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const weaknessTypeSelect = document.getElementById("weakness-type");
    const weaknessTypeImg = document.getElementById("form-weakness-type");
    if (weaknessTypeSelect && weaknessTypeImg) {
        /**
         * Met à jour l'icône du type de faiblesse.
         */
        function updateWeaknessType() {
            weaknessTypeImg.src = `assets/energy/${weaknessTypeSelect.value}.png`;
            weaknessTypeImg.alt = weaknessTypeSelect.value;
        }
        weaknessTypeSelect.addEventListener("change", updateWeaknessType);
        updateWeaknessType();
    }

    const resistanceTypeSelect = document.getElementById("resistance-type");
    const resistanceTypeImg = document.getElementById("form-resistance-type");
    if (resistanceTypeSelect && resistanceTypeImg) {
        /**
         * Met à jour l'icône du type de résistance.
         */
        function updateResistanceType() {
            resistanceTypeImg.src = `assets/energy/${resistanceTypeSelect.value}.png`;
            resistanceTypeImg.alt = resistanceTypeSelect.value;
        }
        resistanceTypeSelect.addEventListener("change", updateResistanceType);
        updateResistanceType();
    }

    const retreatCostInput = document.getElementById("retreat-cost");
    const retreatCostContainer = document.getElementById("form-retreat-cost");
    if (retreatCostInput && retreatCostContainer) {
        /**
         * Met à jour l'affichage du coût de retraite.
         */
        function updateRetreatCost() {
            retreatCostContainer.innerHTML = "";
            const cost = parseInt(retreatCostInput.value, 10) || 0;
            for (let i = 0; i < cost; i++) {
                const img = document.createElement("img");
                img.src = "assets/energy/normal.png";
                img.alt = "retreat cost";
                retreatCostContainer.appendChild(img);
            }
        }
        retreatCostInput.addEventListener("input", updateRetreatCost);
        updateRetreatCost();
    }

    const extensionInput = document.getElementById("extension");
    const extensionContainer = document.getElementById("form-extension");
    if (extensionInput && extensionContainer) {
        const extensionImg = extensionContainer.querySelector("img");
        extensionInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file && extensionImg) {
                const reader = new FileReader();
                reader.onload = (ev) => {
                    extensionImg.src = ev.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    }

    const regulationSelect = document.getElementById("regulation");
    const regulationImg = document.getElementById("form-regulation");
    if (regulationSelect && regulationImg) {
        /**
         * Met à jour l'icône de la régulation.
         */
        function updateRegulation() {
            regulationImg.src = `assets/regulation/${regulationSelect.value.toUpperCase()}.png`;
            regulationImg.alt = regulationSelect.value;
        }
        regulationSelect.addEventListener("change", updateRegulation);
        updateRegulation();
    }

    const raritySelect = document.getElementById("rarity");
    const rarityImg = document.getElementById("form-rarity");
    if (raritySelect && rarityImg) {
        /**
         * Met à jour l'icône de la rareté.
         */
        function updateRarity() {
            rarityImg.src = `assets/rarity/${raritySelect.value}.png`;
            rarityImg.alt = raritySelect.value;
        }
        raritySelect.addEventListener("change", updateRarity);
        updateRarity();
    }

    const attackContainer = document.getElementById("attacks-container");
    const attackCountInput = document.getElementById("nomber-atk");
    let currentAttackCount = 0;
    const energyTypes = [
        { value: "normal", label: "Normal" },
        { value: "fire", label: "Fire" },
        { value: "grass", label: "Grass" },
        { value: "water", label: "Water" },
        { value: "lightning", label: "Lightning" },
        { value: "fighting", label: "Fighting" },
        { value: "psychic", label: "Psychic" },
        { value: "metal", label: "Metal" },
        { value: "dragon", label: "Dragon" },
        { value: "darkness", label: "Darkness" }
    ];

    /**
     * Crée les champs de configuration pour l'attaque donnée.
     * @param {number} n - Le numéro de l'attaque.
     */
    function createAttackFields(n) {
        if (document.getElementById(`attack-config-${n}`)) return;
        let defName = "", defDmg = "", defDesc = "";
        if (n === 1) {
            defName = "Colorful Palette";
            defDesc = "Look at the top 5 cards of your deck. You may attach any number of basic Energy cards you find there to 1 of your Pokémon. Shuffle the other cards back into your deck.";
        }
        if (n === 2) {
            defName = "Ram";
            defDmg = "30";
            defDesc = "A simple physical charge to the opponent.";
        }
        if (n === 3) {
            defName = "Attack 3";
            defDmg = "60";
            defDesc = "Description of the attack 3.";
        }
        const div = document.createElement("div");
        div.classList.add("attack-config");
        div.id = `attack-config-${n}`;
        div.innerHTML = `
          <h3><span data-i18n="atk.title">Attack</span> <span>${n}</span></h3>
          <div class="lab-inp" id="attack${n}-cost-container">
            <label data-i18n="atk.cost.title">Cost:</label>
            <div id="attack${n}-cost-list"></div>
            <button type="button" class="add-energy-btn" data-attack="${n}" data-i18n="atk.cost.add">Add energy</button>
          </div>
          <div class="lab-inp">
            <label for="attack${n}-name" data-i18n="atk.name">Name:</label>
            <input type="text" id="attack${n}-name" value="${defName}">
          </div>
          <div class="lab-inp">
            <label for="attack${n}-damage" data-i18n="atk.damage">Damage:</label>
            <input type="number" id="attack${n}-damage" value="${defDmg}">
          </div>
          <div class="lab-inp">
            <label for="attack${n}-desc" data-i18n="atk.description.title">Description:</label>
            <input type="text" id="attack${n}-desc" value="${defDesc}">
          </div>
          <hr/>
        `;
        attackContainer.appendChild(div);
        syncAttackInputs(n);
        const btn = div.querySelector(`.add-energy-btn[data-attack="${n}"]`);
        if (btn) {
            btn.addEventListener("click", () => addEnergySelect(n));
        }
        if (!window.hasInitializedDefaults) {
            if (n === 1) {
                const sel1 = addEnergySelect(1);
                if (sel1) sel1.value = "normal";
                updateAttackCostOnCard(1);
            }
            if (n === 2) {
                const sel2a = addEnergySelect(2);
                const sel2b = addEnergySelect(2);
                if (sel2a) sel2a.value = "normal";
                if (sel2b) sel2b.value = "normal";
                updateAttackCostOnCard(2);
            }
        }
    }

    /**
     * Supprime les champs de configuration de l'attaque donnée.
     * @param {number} n - Le numéro de l'attaque.
     */
    function removeAttackFields(n) {
        const block = document.getElementById(`attack-config-${n}`);
        if (block) block.remove();
        const cardAttackBlock = document.querySelector(`.attack.attack${n}`);
        if (cardAttackBlock) {
            cardAttackBlock.style.display = "none";
        }
    }

    /**
     * Ajoute un sélecteur pour choisir le type d'énergie pour l'attaque donnée.
     * @param {number} n - Le numéro de l'attaque.
     * @returns {HTMLSelectElement|null} Le sélecteur créé ou null.
     */
    function addEnergySelect(n) {
        const costList = document.getElementById(`attack${n}-cost-list`);
        if (!costList) return null;
        const existing = costList.querySelectorAll(".energy-select-container").length;
        if (existing >= 5) {
            alert("Maximum 5 energies !");
            return null;
        }
        const container = document.createElement("div");
        container.classList.add("energy-select-container");
        const select = document.createElement("select");
        select.classList.add("energy-select");
        energyTypes.forEach(et => {
            const opt = document.createElement("option");
            opt.value = et.value;
            opt.setAttribute("data-i18n", "types." + et.value);
            opt.textContent = et.label;
            select.appendChild(opt);
        });
        const removeBtn = document.createElement("button");
        removeBtn.type = "button";
        removeBtn.setAttribute("data-i18n", "atk.cost.remove");
        removeBtn.textContent = "Remove";
        removeBtn.addEventListener("click", () => {
            container.remove();
            updateAttackCostOnCard(n);
        });
        container.appendChild(select);
        container.appendChild(removeBtn);
        costList.appendChild(container);
        select.addEventListener("change", () => updateAttackCostOnCard(n));
        updateAttackCostOnCard(n);
        return select;
    }

    /**
     * Met à jour l'affichage des coûts d'attaque sur la carte pour l'attaque donnée.
     * @param {number} n - Le numéro de l'attaque.
     */
    function updateAttackCostOnCard(n) {
        const costDiv = document.getElementById(`form-cost-atk${n}`);
        if (!costDiv) return;
        costDiv.innerHTML = "";
        const costList = document.getElementById(`attack${n}-cost-list`);
        if (!costList) return;
        const selects = costList.querySelectorAll(".energy-select");
        selects.forEach(sel => {
            const val = sel.value;
            const img = document.createElement("img");
            img.src = `assets/energy/${val}.png`;
            img.alt = val;
            costDiv.appendChild(img);
        });
    }

    /**
     * Synchronise les entrées de l'attaque (nom, dégâts, description) avec l'affichage sur la carte.
     * @param {number} n - Le numéro de l'attaque.
     */
    function syncAttackInputs(n) {
        syncInput(`attack${n}-name`, `form-name-atk${n}`);
        syncInput(`attack${n}-damage`, `form-damage-atk${n}`);
        syncInput(`attack${n}-desc`, `form-description-atk${n}`);
    }

    /**
     * Affiche ou masque les blocs d'attaques sur la carte en fonction du nombre d'attaques.
     * @param {number} count - Le nombre d'attaques à afficher.
     */
    function showHideAttacksOnCard(count) {
        for (let i = 1; i <= 4; i++) {
            const div = document.querySelector(`.attack.attack${i}`);
            if (!div) continue;
            div.style.display = (i <= count) ? "block" : "none";
        }
    }

    /**
     * Met à jour le nombre d'attaques en créant ou supprimant les champs de configuration correspondants.
     */
    function updateAttackCount() {
        const newCount = parseInt(attackCountInput.value, 10) || 0;
        if (newCount > currentAttackCount) {
            for (let i = currentAttackCount + 1; i <= newCount; i++) {
                createAttackFields(i);
                const cardDiv = document.querySelector(`.attack.attack${i}`);
                if (cardDiv) {
                    cardDiv.style.display = "block";
                }
            }
        } else if (newCount < currentAttackCount) {
            for (let i = currentAttackCount; i > newCount; i--) {
                removeAttackFields(i);
            }
        }
        currentAttackCount = newCount;
        showHideAttacksOnCard(newCount);
        window.hasInitializedDefaults = true;
    }

    attackCountInput.addEventListener("input", updateAttackCount);
    updateAttackCount();

    const displayFooterCheckbox = document.getElementById("display-footer");
    const cardFooter = document.getElementById("card-footer");
    const cardBody = document.getElementById("card-body");
    const formFooter = document.getElementById("form-footer");

    if (displayFooterCheckbox && cardFooter && cardBody) {
        /**
         * Gère l'affichage du footer et ajuste la hauteur du corps de la carte
         */
        function toggleFooterDisplay() {
            if (displayFooterCheckbox.checked) {
                formFooter.style.display = "block";
                cardFooter.style.display = "block";
                cardBody.style.height = "";
            } else {
                formFooter.style.display = "none";
                cardFooter.style.display = "none";
                cardBody.style.height = "260px";
            }
        }

        toggleFooterDisplay();
        displayFooterCheckbox.addEventListener("change", toggleFooterDisplay);
    }

    const attackFontSizeInput = document.getElementById("size-atk-description-font");
    const attackTextElements = document.querySelectorAll(".attack-text");

    if (attackFontSizeInput && attackTextElements.length > 0) {
        /**
         * Met à jour la taille de police de toutes les descriptions d'attaque
         */
        function updateAttackFontSize() {
            const fontSize = attackFontSizeInput.value || 15;
            attackTextElements.forEach(element => {
                element.style.fontSize = `${fontSize}px`;
                element.style.lineHeight = `${fontSize}px`;
            });
        }

        updateAttackFontSize();
        attackFontSizeInput.addEventListener("input", updateAttackFontSize);
    }
});
