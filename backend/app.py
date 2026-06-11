from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)


BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "data.json"


def get_default_data() -> dict[str, list[dict[str, Any]]]:
    """Return small fallback data if data.json is missing."""

    return {
        "products": [
            {
                "id": 1,
                "name": "Sample Product 1",
                "image": "product-1.jpg",
                "intro": "Sample product intro.",
                "detail": "Sample product detail.",
                "audience": "Sample audience",
                "pricing": "Contact for pricing",
            },
            {
                "id": 2,
                "name": "Sample Product 2",
                "image": "product-2.jpg",
                "intro": "Sample product intro.",
                "detail": "Sample product detail.",
                "audience": "Sample audience",
                "pricing": "Contact for pricing",
            },
            {
                "id": 3,
                "name": "Sample Product 3",
                "image": "product-3.jpg",
                "intro": "Sample product intro.",
                "detail": "Sample product detail.",
                "audience": "Sample audience",
                "pricing": "Contact for pricing",
            }
        ],
        "experiences": [
            {
                "id": 1,
                "title": "Sample Experience 1",
                "image": "experience-1.jpg",
                "intro": "Sample experience intro.",
                "story": "Sample experience story.",
                "date": "2024",
                "result": "Sample result",
            },
            {
                "id": 2,
                "title": "Sample Experience 2",
                "image": "experience-2.jpg",
                "intro": "Sample experience intro.",
                "story": "Sample experience story.",
                "date": "2024",
                "result": "Sample result",
            },
            {
                "id": 3,
                "title": "Sample Experience 3",
                "image": "experience-3.jpg",
                "intro": "Sample experience intro.",
                "story": "Sample experience story.",
                "date": "2024",
                "result": "Sample result",
            }
        ],
    }


def load_data() -> dict[str, list[dict[str, Any]]]:
    """Load the JSON storage file."""

    if not DATA_FILE.exists():
        data = get_default_data()
        save_data(data)
        return data

    with DATA_FILE.open("r", encoding="utf-8") as file:
        return json.load(file)


def save_data(data: dict[str, list[dict[str, Any]]]) -> None:
    """Write the JSON storage file back to disk."""

    with DATA_FILE.open("w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=2)


def next_id(items: list[dict[str, Any]]) -> int:
    """Return the next numeric ID."""

    if not items:
        return 1
    return max(item["id"] for item in items) + 1


def find_item(items: list[dict[str, Any]], item_id: int) -> dict[str, Any] | None:
    """Find one item by ID."""

    return next((item for item in items if item["id"] == item_id), None)


def require_text_field(payload: dict[str, Any], field_name: str) -> str:
    """Validate a required text field."""

    value = str(payload.get(field_name, "")).strip()
    if not value:
        raise ValueError(field_name)
    return value


@app.get("/api/health")
def health_check():
    return jsonify({"status": "ok", "message": "backend is running"})


@app.get("/api/products")
def get_products():
    data = load_data()
    return jsonify(data["products"])


@app.get("/api/products/<int:product_id>")
def get_product_detail(product_id: int):
    data = load_data()
    product = find_item(data["products"], product_id)
    if product is None:
        return jsonify({"message": "product not found"}), 404
    return jsonify(product)


@app.post("/api/products")
def create_product():
    payload = request.get_json(silent=True) or {}

    try:
        name = require_text_field(payload, "name")
        intro = require_text_field(payload, "intro")
    except ValueError:
        return jsonify({"message": "name and intro are required"}), 400

    data = load_data()
    new_product = {
        "id": next_id(data["products"]),
        "name": name,
        "image": str(payload.get("image", "")).strip(),
        "intro": intro,
        "detail": str(payload.get("detail", "")).strip(),
        "audience": str(payload.get("audience", "")).strip(),
        "pricing": str(payload.get("pricing", "")).strip(),
    }
    data["products"].append(new_product)
    save_data(data)
    return jsonify(new_product), 201


@app.delete("/api/products/<int:product_id>")
def delete_product(product_id: int):
    """Delete one product by ID."""

    data = load_data()
    product = find_item(data["products"], product_id)
    if product is None:
        return jsonify({"message": "product not found"}), 404

    data["products"] = [item for item in data["products"] if item["id"] != product_id]
    save_data(data)
    return jsonify({"message": "product deleted", "id": product_id})


@app.get("/api/experiences")
def get_experiences():
    data = load_data()
    return jsonify(data["experiences"])


@app.get("/api/experiences/<int:experience_id>")
def get_experience_detail(experience_id: int):
    data = load_data()
    experience = find_item(data["experiences"], experience_id)
    if experience is None:
        return jsonify({"message": "experience not found"}), 404
    return jsonify(experience)


@app.post("/api/experiences")
def create_experience():
    payload = request.get_json(silent=True) or {}

    try:
        title = require_text_field(payload, "title")
        intro = require_text_field(payload, "intro")
    except ValueError:
        return jsonify({"message": "title and intro are required"}), 400

    data = load_data()
    new_experience = {
        "id": next_id(data["experiences"]),
        "title": title,
        "image": str(payload.get("image", "")).strip(),
        "intro": intro,
        "story": str(payload.get("story", "")).strip(),
        "date": str(payload.get("date", "")).strip(),
        "result": str(payload.get("result", "")).strip(),
    }
    data["experiences"].append(new_experience)
    save_data(data)
    return jsonify(new_experience), 201


@app.delete("/api/experiences/<int:experience_id>")
def delete_experience(experience_id: int):
    """Delete one experience by ID."""

    data = load_data()
    experience = find_item(data["experiences"], experience_id)
    if experience is None:
        return jsonify({"message": "experience not found"}), 404

    data["experiences"] = [item for item in data["experiences"] if item["id"] != experience_id]
    save_data(data)
    return jsonify({"message": "experience deleted", "id": experience_id})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
