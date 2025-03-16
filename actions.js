import defaultData from "./defaultData.js";

document.addEventListener("DOMContentLoaded", function () {

    /**
     * Nettoie le nom pour l'utiliser comme nom de fichier.
     * @param {string} name - Le nom à nettoyer.
     * @returns {string} Nom nettoyé, avec les espaces remplacés par des underscores et les caractères spéciaux supprimés.
     */
    function sanitizeFileName(name) {
        return name.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
    }

    const exportBtn = document.getElementById("export");
    if (exportBtn) {
        exportBtn.addEventListener("click", () => {
            const cardElement = document.querySelector(".pokemon-card");
            if (!cardElement) {
                alert("Impossible to find the map!");
                return;
            }
            const scale = 4;
            const options = {
                style: {
                    transform: "scale(" + scale + ")",
                    transformOrigin: "top left"
                },
                width: cardElement.clientWidth * scale,
                height: cardElement.clientHeight * scale
            };
            domtoimage
                .toPng(cardElement, options)
                .then((dataUrl) => {
                    const link = document.createElement("a");
                    // Récupère et nettoie le nom du Pokémon à partir de l'input "name"
                    const nameInput = document.getElementById("name");
                    let pokemonName = (nameInput ? nameInput.value : "").trim();
                    pokemonName = pokemonName.length > 0 ? sanitizeFileName(pokemonName) : "pokemon-card";
                    link.download = pokemonName + ".png";
                    link.href = dataUrl;
                    link.click();
                })
                .catch((error) => {
                    console.error("Erreur export PNG:", error);
                });
        });
    }

    const saveBtn = document.getElementById("save");
    if (saveBtn) {
        saveBtn.addEventListener("click", async () => {
            const data = await collectFormData();
            const jsonStr = JSON.stringify(data, null, 2);
            const blob = new Blob([jsonStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            // Optionnel : on peut aussi utiliser le nom du Pokémon pour le fichier JSON
            const nameInput = document.getElementById("name");
            let pokemonName = (nameInput ? nameInput.value : "").trim();
            pokemonName = pokemonName.length > 0 ? sanitizeFileName(pokemonName) : "pokemon-card";
            link.download = pokemonName + ".json";
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        });
    }

    const loadBtn = document.getElementById("load");
    if (loadBtn) {
        loadBtn.addEventListener("click", () => {
            const inputFile = document.createElement("input");
            inputFile.type = "file";
            inputFile.accept = ".json";
            inputFile.addEventListener("change", (evt) => {
                const file = evt.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const jsonData = JSON.parse(e.target.result);
                        fillFormFromData(jsonData);
                    } catch (err) {
                        alert("Fichier JSON invalide !");
                        console.error(err);
                    }
                };
                reader.readAsText(file);
            });
            inputFile.click();
        });
    }

    const resetBtn = document.getElementById("reset");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            const reponse = confirm("Are you sure you want to reset everything?");
            if (reponse) {
                fillFormFromData(defaultData);
            }
        });
    }

    // Appliquer les valeurs par défaut au chargement
    fillFormFromData(defaultData);

    /**
     * Récupère toutes les données du formulaire.
     * @returns {Promise<Object>} Objet contenant les données du formulaire.
     */
    async function collectFormData() {
        const data = {};
        data.name = getVal("name");
        data.hp = getVal("hp");
        data.hpNb = getVal("hp-nb");
        data.type = getVal("type");
        data.info = getVal("info");
        data.nomberAtk = getVal("nomber-atk");
        data.weakness = getVal("weakness");
        data.weaknessType = getVal("weakness-type");
        data.weaknessValue = getVal("weakness-value");
        data.resistance = getVal("resistance");
        data.resistanceType = getVal("resistance-type");
        data.resistanceValue = getVal("resistance-value");
        data.retreat = getVal("retreat");
        data.retreatCost = getVal("retreat-cost");
        data.illustrator = getVal("illustrator");
        data.regulation = getVal("regulation");
        data.numbering = getVal("numbering");
        data.rarity = getVal("rarity");
        data.description = getVal("description");

        data.attacks = {};
        const atkCount = parseInt(data.nomberAtk, 10) || 0;
        for (let i = 1; i <= atkCount; i++) {
            data.attacks[i] = {
                name: getVal(`attack${i}-name`),
                damage: getVal(`attack${i}-damage`),
                desc: getVal(`attack${i}-desc`),
                cost: getAttackCost(i)
            };
        }
        const mainImg = document.querySelector("#form-image img");
        data.mainImage = mainImg ? mainImg.src : "";
        const extImg = document.querySelector("#form-extension img");
        data.extensionImage = extImg ? extImg.src : "";
        return data;
    }

    /**
     * Remplit le formulaire avec les données fournies.
     * @param {Object} data - Données à appliquer au formulaire.
     */
    function fillFormFromData(data) {
        setVal("name", data.name);
        setVal("hp", data.hp);
        setVal("hp-nb", data.hpNb);
        setVal("type", data.type);
        setVal("info", data.info);
        setVal("nomber-atk", data.nomberAtk);
        setVal("weakness", data.weakness);
        setVal("weakness-type", data.weaknessType);
        setVal("weakness-value", data.weaknessValue);
        setVal("resistance", data.resistance);
        setVal("resistance-type", data.resistanceType);
        setVal("resistance-value", data.resistanceValue);
        setVal("retreat", data.retreat);
        setVal("retreat-cost", data.retreatCost);
        setVal("illustrator", data.illustrator);
        setVal("regulation", data.regulation);
        setVal("numbering", data.numbering);
        setVal("rarity", data.rarity);
        setVal("description", data.description);

        document.getElementById("nomber-atk").dispatchEvent(new Event("input"));

        if (data.attacks) {
            for (let i = 1; i <= 4; i++) {
                if (data.attacks[i]) {
                    setVal(`attack${i}-name`, data.attacks[i].name);
                    setVal(`attack${i}-damage`, data.attacks[i].damage);
                    setVal(`attack${i}-desc`, data.attacks[i].desc);
                    setAttackCost(i, data.attacks[i].cost || []);
                }
            }
        }

        const imageInput = document.getElementById("image");
        if (imageInput) imageInput.value = "";
        const extensionInput = document.getElementById("extension");
        if (extensionInput) extensionInput.value = "";

        const mainImgElement = document.querySelector("#form-image img");
        if (mainImgElement) {
            mainImgElement.src =
                data.mainImage && data.mainImage.trim() !== ""
                    ? data.mainImage
                    : defaultData.mainImage;
        }

        const extensionImgElement = document.querySelector("#form-extension img");
        if (extensionImgElement) {
            extensionImgElement.src =
                data.extensionImage && data.extensionImage.trim() !== ""
                    ? data.extensionImage
                    : defaultData.extensionImage;
        }

        document.querySelectorAll("input, select, textarea").forEach(el => {
            el.dispatchEvent(new Event("input", { bubbles: true }));
            el.dispatchEvent(new Event("change", { bubbles: true }));
        });
    }

    /**
     * Récupère la valeur de l'élément dont l'id est fourni.
     * @param {string} id - L'identifiant de l'élément.
     * @returns {string} La valeur de l'élément ou une chaîne vide.
     */
    function getVal(id) {
        const el = document.getElementById(id);
        return el ? el.value : "";
    }

    /**
     * Affecte une valeur à l'élément dont l'id est fourni.
     * @param {string} id - L'identifiant de l'élément.
     * @param {string} val - La valeur à affecter.
     */
    function setVal(id, val) {
        const el = document.getElementById(id);
        if (el && val !== undefined) el.value = val;
    }

    /**
     * Récupère la liste des coûts d'attaque pour une attaque donnée.
     * @param {number} n - Le numéro de l'attaque.
     * @returns {string[]} Liste des coûts d'énergie.
     */
    function getAttackCost(n) {
        const costList = document.getElementById(`attack${n}-cost-list`);
        if (!costList) return [];
        const selects = costList.querySelectorAll(".energy-select");
        const result = [];
        selects.forEach(sel => {
            result.push(sel.value);
        });
        return result;
    }

    /**
     * Définit la liste des coûts d'attaque pour une attaque donnée.
     * @param {number} n - Le numéro de l'attaque.
     * @param {string[]} costArray - Tableau des coûts d'énergie.
     */
    function setAttackCost(n, costArray) {
        const costList = document.getElementById(`attack${n}-cost-list`);
        if (!costList) return;
        while (costList.firstChild) {
            costList.removeChild(costList.firstChild);
        }
        costArray.forEach(val => {
            const container = document.createElement("div");
            container.classList.add("energy-select-container");
            const select = document.createElement("select");
            select.classList.add("energy-select");
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
            energyTypes.forEach(et => {
                const opt = document.createElement("option");
                opt.value = et.value;
                opt.textContent = et.label;
                select.appendChild(opt);
            });
            select.value = val;
            const removeBtn = document.createElement("button");
            removeBtn.type = "button";
            removeBtn.textContent = "Retirer";
            removeBtn.addEventListener("click", () => {
                container.remove();
                select.dispatchEvent(new Event("change", { bubbles: true }));
            });
            container.appendChild(select);
            container.appendChild(removeBtn);
            costList.appendChild(container);
            select.addEventListener("change", () => {
                document.getElementById(`attack${n}-desc`)?.dispatchEvent(new Event("input"));
            });
        });
        document.getElementById(`attack${n}-desc`)?.dispatchEvent(new Event("input"));
    }
});
