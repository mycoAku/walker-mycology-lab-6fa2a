import copy
import json
from pathlib import Path
import tempfile
import unittest

from build_content import ROOT, build


class ContentBuildTests(unittest.TestCase):
    def setUp(self):
        self.content = json.loads((ROOT / "content" / "website.json").read_text())

    def build_content(self, content):
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / "website.json"
            destination = Path(directory) / "content.js"
            source.write_text(json.dumps(content))
            build(source, destination)
            output = destination.read_text()
            return json.loads(output.removeprefix("const siteContent = ").removesuffix(";\n"))

    def test_move_member_add_photo_and_change_news_and_links(self):
        content = copy.deepcopy(self.content)
        member = next(item for item in content["members"] if item["name"] == "Clara Ryan")
        member["category"] = "Alumni"
        content["members"].append({
            "name": "Test Student", "category": "Honors", "role": "Honours student",
            "bio": "Studying *fungi* and **plants**.", "image": "/uploads/test photo.png",
        })
        content["news"][0]["title"] = "Updated headline"
        content["news"][0]["url"] = "https://example.org/news?first=1&second=2"
        content["news"].pop()
        content["resources"][0]["url"] = "https://example.org/resource"
        result = self.build_content(content)
        self.assertEqual(next(item for item in result["members"] if item["name"] == "Clara Ryan")["category"], "Alumni")
        added = result["members"][-1]
        self.assertEqual(added["image"], "uploads/test%20photo.png")
        self.assertEqual(added["bio"], "Studying <em>fungi</em> and <strong>plants</strong>.")
        self.assertEqual(result["news"][0][1], "Updated headline")
        self.assertEqual(result["news"][0][3], "https://example.org/news?first=1&amp;second=2")
        self.assertEqual(len(result["news"]), len(content["news"]))
        self.assertEqual(result["resources"][0]["url"], "https://example.org/resource")

    def test_empty_news_and_archive_are_allowed(self):
        content = copy.deepcopy(self.content)
        content["news"] = []
        content["archive"] = []
        result = self.build_content(content)
        self.assertEqual(result["news"], [])
        self.assertEqual(result["archive"], [])

    def test_unsafe_urls_and_html_are_not_rendered_as_code(self):
        content = copy.deepcopy(self.content)
        content["members"][0]["bio"] = '<script>alert("test")</script>'
        result = self.build_content(content)
        self.assertIn("&lt;script&gt;", result["members"][0]["bio"])
        content["resources"][0]["url"] = "javascript:alert(1)"
        with self.assertRaises(ValueError):
            self.build_content(content)


if __name__ == "__main__":
    unittest.main()
