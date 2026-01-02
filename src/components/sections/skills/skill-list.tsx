import { type JSX } from 'react'

import { BlueprintText } from '@/components/blueprint/blueprint-text'
import { SkillBadge } from '@/components/sections/skills/skill-badge'
import { shouldShowSkill } from '@/lib/tech-radar-utilities'
import type { FCStrict } from '@/types/fc'
import { type Skill, SKILL_RENDER_AREAS } from '@/types/skill'

interface SkillListProperties {
  readonly items: readonly Skill[]
  readonly title: string
}

export const SkillList: FCStrict<SkillListProperties> = ({
  items,
  title,
}: SkillListProperties): JSX.Element => {
  const filteredItems: Skill[] = items
    .filter((skill: Skill): boolean =>
      shouldShowSkill({ renderArea: SKILL_RENDER_AREAS.SECTION, skill })
    )
    .toSorted(
      (skillOne: Skill, skillTwo: Skill): number =>
        skillTwo.confidence - skillOne.confidence
    )

  return (
    <div className="space-y-4 text-center lg:text-left">
      <div className="inline-block border-l-2 border-brand pl-3">
        <BlueprintText
          as="h3"
          className="text-sm font-bold text-blueprint-text"
          uppercase={true}
        >
          {title}
        </BlueprintText>
      </div>

      <ul className="flex flex-wrap justify-center gap-2 lg:justify-start">
        {filteredItems.map(
          (skill: Skill): JSX.Element => (
            <SkillBadge key={skill.name} skill={skill} />
          )
        )}
      </ul>
    </div>
  )
}
